package kalba.util;

import kalba.models.coc.clan.League;
import kalba.models.coc.clan.PlayerLabel;
import kalba.models.coc.clan.Statistic;
import kalba.models.coc.yongha.FormulaData;
import kalba.repository.StatisticMongoRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicBoolean;

public class MemberDataManager {
    private final StatisticMongoRepository statisticMongoRepository;
    private static Map<String, FormulaData> formula;
    public static final Map<String, AtomicBoolean> LOADING_MAP = new ConcurrentHashMap<>();
    private static String token;

    public MemberDataManager(StatisticMongoRepository statisticMongoRepository, String token) {
        this.statisticMongoRepository = statisticMongoRepository;
        MemberDataManager.token = token;
    }

    private final Set<String> clanTagSet = ConcurrentHashMap.newKeySet();

    public Set<String> getClanTagSet() {
        return clanTagSet;
    }

    public void addClanTag(String clanTag) {
        LOADING_MAP.put(clanTag, new AtomicBoolean(false));
        clanTagSet.add(clanTag);
    }

    protected void updateAll() {
        for (String clanCode : clanTagSet) {
            updateClanInfo(clanCode);
        }
    }

    public boolean updateClanInfo(String clanCode) {
        if (LOADING_MAP.get(clanCode).get()) {
            return false;
        }
        LOADING_MAP.get(clanCode).set(true);
        Map<Object, Object> clanInfo = getClanInfo(clanCode);
        if (clanInfo.size() == 0) {
            return false;
        }
        statisticMongoRepository.updateClanInfo(clanInfo);
        List<Statistic> statisticList = getClanMemberList(clanInfo);
        statisticList.sort(Comparator.comparing(Statistic::getYonghaScore).reversed());
        int idx = 1;
        for (Statistic statistic : statisticList) {
            statistic.setYonghaScoreRank(idx);
            idx++;
        }
        idx = 1;
        statisticList.sort(Comparator.comparing(Statistic::getDonations).reversed());
        for (Statistic statistic : statisticList) {
            statistic.setDonationRank(idx);
            idx++;
        }
        statisticMongoRepository.updateClanMemberStatistic(statisticList, clanCode);
        LOADING_MAP.get(clanCode).set(false);
        return true;
    }

    @SuppressWarnings("unchecked")
    private Map<Object, Object> getClanInfo(String id) {
        try {
            HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
            factory.setConnectTimeout(5000);
            factory.setReadTimeout(5000);
            RestTemplate restTemplate = new RestTemplate(factory);
            HttpHeaders header = new HttpHeaders();
            header.setBearerAuth(token);
            header.add("Accept", "*/*");
            header.setContentType(MediaType.APPLICATION_JSON);
            URI url = URI.create("https://api.clashofclans.com/v1/clans/" + id);
            ResponseEntity<Object> res = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(header), Object.class);
            return (Map<Object, Object>) res.getBody();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            e.printStackTrace();
            return Map.of("statusCode", e.getRawStatusCode(),
                    "statusText", e.getStatusText());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Map.of("statusCode", "3032",
                "statusText", "error");
    }

    @SuppressWarnings("unchecked")
    private List<Statistic> getClanMemberList(Map<Object, Object> clanInfo) {
        Object memberListObj = clanInfo.get("memberList");
        if (memberListObj == null) {
            return new LinkedList<>();
        }
        List<LinkedHashMap<Object, Object>> memberList = (ArrayList<LinkedHashMap<Object, Object>>) memberListObj;
        List<Statistic> statisticList = Collections.synchronizedList(new LinkedList<>());
        Map<String, FormulaData> formulaAllInOne = new HashMap<>();
        statisticMongoRepository.findYonghaScoreFormula().ifPresent(formula -> {
            formulaAllInOne.putAll(formula.getHeroes());
            formulaAllInOne.putAll(formula.getPets());
            formulaAllInOne.putAll(formula.getSpells());
            formulaAllInOne.putAll(formula.getSiegeMachines());
            formulaAllInOne.putAll(formula.getUnits());
        });
        formula = formulaAllInOne;
        try {
            for (LinkedHashMap<Object, Object> memberInfo : memberList) {
                Statistic statistic = new Statistic();
                statistic.setTag((String) memberInfo.get("tag"));
                statistic.setName((String) memberInfo.get("name"));
                statistic.setRole((String) memberInfo.get("role"));
                statistic.setExpLevel((int) memberInfo.get("expLevel"));
                statistic.setTrophies((int) memberInfo.get("trophies"));
                statistic.setVersusTrophies((int) memberInfo.get("versusTrophies"));
                statistic.setClanRank((int) memberInfo.get("clanRank"));
                statistic.setPreviousClanRank((int) memberInfo.get("previousClanRank"));
                statistic.setDonations((int) memberInfo.get("donations"));
                statistic.setDonationsReceived((int) memberInfo.get("donationsReceived"));
                League league = new League();
                if (memberInfo.get("league") != null) {
                    LinkedHashMap<Object, Object> leagueInfo = (LinkedHashMap<Object, Object>) memberInfo.get("league");
                    league.setId((Integer) leagueInfo.get("id"));
                    league.setName((String) leagueInfo.get("name"));
                    LinkedHashMap<Object, Object> iconInfo = (LinkedHashMap<Object, Object>) leagueInfo.get("iconUrls");
                    league.setIconTiny((String) iconInfo.get("tiny"));
                    league.setIconSmall((String) iconInfo.get("small"));
                    league.setIconMedium((String) iconInfo.get("medium"));
                }
                statistic.setLeague(league);
                statisticList.add(statistic);
            }
            ArrayList<Thread> threads = new ArrayList<>();
            for (Statistic statistic : statisticList) {
                Thread thread = new YonghaScoreThread(statistic, formulaAllInOne);
                thread.start();
                threads.add(thread);
            }
            for (Thread thread : threads) {
                try {
                    thread.join();
                } catch (Exception e) {
                    e.printStackTrace();
                    new LinkedList<>();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new LinkedList<>();
        }
        return statisticList;
    }

    public static String encodeUTF8(String userTag) {
        return URLEncoder.encode(userTag, StandardCharsets.UTF_8);
    }

    public static String decodeUTF8(String userTag) {
        return URLDecoder.decode(userTag, StandardCharsets.UTF_8);
    }

    private static double calListScore(List<LinkedHashMap<Object, Object>> list) {
        double score = 0;
        for (LinkedHashMap<Object, Object> troop : list) {
            if (troop.get("village").equals("home")) {
                String name = (String) troop.get("name");
                if (formula.get(name) != null) {
                    int level = (int) troop.get("level");
                    score += level * formula.get(name).getValue();
                }
            }
        }
        return score;
    }

    @AllArgsConstructor
    private static class YonghaScoreThread extends Thread {
        Statistic statistic;
        Map<String, FormulaData> formula;

        public void run() {
            statistic.setYonghaScore((int) Math.round(calYonghaScore(statistic.getTag())));
        }

        @SuppressWarnings("unchecked")
        private double calYonghaScore(String userTag) {
            double score = 0;
            try {
                HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
                factory.setConnectTimeout(5000);
                factory.setReadTimeout(5000);
                RestTemplate restTemplate = new RestTemplate(factory);
                HttpHeaders header = new HttpHeaders();
                header.setBearerAuth(token);
                header.add("Accept", "*/*");
                header.setContentType(MediaType.APPLICATION_JSON);
                URI url = URI.create("https://api.clashofclans.com/v1/players/" + encodeUTF8(userTag));
                ResponseEntity<Object> res = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(header), Object.class);
                Map<Object, Object> body = (Map<Object, Object>) res.getBody();
                if (body == null) {
                    return -1;
                }
                if (body.get("troops") != null) {
                    Object troopsObject = body.get("troops");
                    statistic.setTroops(troopsObject);
                    score += calListScore((List<LinkedHashMap<Object, Object>>) troopsObject);
                }
                if (body.get("heroes") != null) {
                    Object heroesObject = body.get("heroes");
                    statistic.setHeroes(heroesObject);
                    score += calListScore((List<LinkedHashMap<Object, Object>>) heroesObject);
                }
                if (body.get("spells") != null) {
                    Object spellsObject = body.get("spells");
                    statistic.setSpells(spellsObject);
                    score += calListScore((List<LinkedHashMap<Object, Object>>) spellsObject);
                }
                if (body.get("townHallLevel") != null) {
                    statistic.setTownHallLevel((int) body.get("townHallLevel"));
                }
                if (body.get("townHallWeaponLevel") != null) {
                    statistic.setTownHallWeaponLevel((int) body.get("townHallWeaponLevel"));
                }
                if (body.get("bestTrophies") != null) {
                    statistic.setBestTrophies((int) body.get("bestTrophies"));
                }
                if (body.get("warStars") != null) {
                    statistic.setWarStars((int) body.get("warStars"));
                }
                if (body.get("labels") != null) {
                    List<Object> labels = (List<Object>) body.get("labels");
                    List<PlayerLabel> labelList = new LinkedList<>();
                    for (Object label : labels) {
                        PlayerLabel playerLabel = new PlayerLabel();
                        playerLabel.setId((Integer) ((LinkedHashMap<String, Object>) label).get("id"));
                        playerLabel.setName(((LinkedHashMap<String, Object>) label).get("name").toString());
                        LinkedHashMap<String, String> iconUrls = (LinkedHashMap<String, String>) ((LinkedHashMap<String, Object>) label).get("iconUrls");
                        playerLabel.setSmallIcon(iconUrls.get("small"));
                        playerLabel.setMediumIcon(iconUrls.get("medium"));
                        labelList.add(playerLabel);
                    }
                    statistic.setLabels(labelList);
                }
            } catch (Exception e) {
                e.printStackTrace();
                return -1;
            }
            return score;
        }
    }
}