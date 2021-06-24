package kalba.repository;

import kalba.config.ReadConfig;
import kalba.model.ClanMember;
import kalba.model.League;
import kalba.model.PlayerLabel;
import lombok.AllArgsConstructor;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicBoolean;

public class ClanMemberRepository extends Thread {
    public final static Set<String> clanCodeSet = ConcurrentHashMap.newKeySet();
    public static final Map<String, AtomicBoolean> loadingMap = new ConcurrentHashMap<>();
    public static final Map<String, Map<Object, Object>> clanInfoMap = new ConcurrentHashMap<>();
    public static final Map<String, List<ClanMember>> clanMemberSortedByYHScoreMap = new ConcurrentHashMap<>();
    public static final Map<String, List<ClanMember>> clanMemberSortedByDonationsMap = new ConcurrentHashMap<>();
    private static final String token = ((boolean) (ReadConfig.config.isLocal) ? ReadConfig.config.localToken : ReadConfig.config.serverToken).toString();

    public void run() {
        try {
            // kalba
            String kalbaCode = "%232Y2Y9YCUU";
            clanCodeSet.add(kalbaCode);
            loadingMap.put(kalbaCode, new AtomicBoolean(false));
            while (true) {
                updateAll();
                // 10min
                Thread.sleep(300000);
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    private void updateAll() {
        for (String clanCode : clanCodeSet) {
            updateClanInfo(clanCode);
        }
    }

    public static boolean updateClanInfo(String clanCode) {
        Map<Object, Object> clanInfo = getClanInfo(clanCode);
        if (clanInfo.size() == 0) {
            return false;
        }
        List<ClanMember> clanMemberList = getClanMemberList(clanInfo);
        Collections.sort(clanMemberList);
        while (loadingMap.get(clanCode).get()) ;
        loadingMap.get(clanCode).set(true);
        clanInfoMap.put(clanCode, clanInfo);
        clanMemberSortedByDonationsMap.put(clanCode, clanMemberList);
        Comparator<ClanMember> yonghaScoreComparator = (o1, o2) -> {
            int result = Integer.compare(o2.getYonghaScore(), o1.getYonghaScore());
            if (result == 0) {
                result = Integer.compare(o2.getTrophies(), o1.getTrophies());
                if (result == 0) {
                    return o1.getName().compareTo(o2.getName());
                } else {
                    return result;
                }
            } else {
                return result;
            }
        };
        List<ClanMember> clanMemberListSortedByYHScore = new LinkedList<>(clanMemberList);
        clanMemberListSortedByYHScore.sort(yonghaScoreComparator);
        clanMemberSortedByYHScoreMap.put(clanCode, clanMemberListSortedByYHScore);
        loadingMap.get(clanCode).set(false);
        return true;
    }

    @SuppressWarnings("unchecked")
    private static Map<Object, Object> getClanInfo(String id) {
        Map<Object, Object> result = new HashMap<>();
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
            result = (Map<Object, Object>) res.getBody();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            result.put("statusCode", e.getRawStatusCode());
            result.put("statusText", e.getStatusText());
            e.printStackTrace();
        } catch (Exception e) {
            result.put("statusCode", "3032");
            result.put("statusText", "error");
            e.printStackTrace();
        }
        return result;
    }

    @SuppressWarnings("unchecked")
    private static List<ClanMember> getClanMemberList(Map<Object, Object> clanInfo) {
        Object memberListObj = clanInfo.get("memberList");
        if (memberListObj == null) {
            return new LinkedList<>();
        }
        List<LinkedHashMap<Object, Object>> memberList = (ArrayList<LinkedHashMap<Object, Object>>) memberListObj;
        List<ClanMember> clanMemberList = Collections.synchronizedList(new LinkedList<>());
        try {
            for (LinkedHashMap<Object, Object> memberInfo : memberList) {
                ClanMember clanMember = new ClanMember();
                clanMember.setTag((String) memberInfo.get("tag"));
                clanMember.setName((String) memberInfo.get("name"));
                clanMember.setRole((String) memberInfo.get("role"));
                clanMember.setExpLevel((int) memberInfo.get("expLevel"));
                clanMember.setTrophies((int) memberInfo.get("trophies"));
                clanMember.setVersusTrophies((int) memberInfo.get("versusTrophies"));
                clanMember.setClanRank((int) memberInfo.get("clanRank"));
                clanMember.setPreviousClanRank((int) memberInfo.get("previousClanRank"));
                clanMember.setDonations((int) memberInfo.get("donations"));
                clanMember.setDonationsReceived((int) memberInfo.get("donationsReceived"));
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
                clanMember.setLeague(league);
                clanMemberList.add(clanMember);
            }
            ArrayList<Thread> threads = new ArrayList<>();
            for (ClanMember clanMember : clanMemberList) {
                Thread thread = new YonghaScoreThread(clanMember);
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
        return clanMemberList;
    }

    private static String encodeUTF8(String userTag) {
        return URLEncoder.encode(userTag, StandardCharsets.UTF_8);
    }

    private static double calListScore(List<LinkedHashMap<Object, Object>> list) {
        double score = 0;
        for (LinkedHashMap<Object, Object> troop : list) {
            if (troop.get("village").equals("home")) {
                int level = (int) troop.get("level");
                String name = (String) troop.get("name");
                switch (name) {
                    // unit
                    case "Barbarian" -> score += level;
                    case "Archer" -> score += level * 1.5;
                    case "Giant" -> score += level * 1.5;
                    case "Goblin" -> score += level * 2.5;
                    case "Wall Breaker" -> score += level * 2.5;
                    case "Balloon" -> score += level * 3.334;
                    case "Wizard" -> score += level * 3;
                    case "Healer" -> score += level * 4.286;
                    case "Dragon" -> score += level * 3.75;
                    case "P.E.K.K.A" -> score += level * 2.778;
                    case "Baby Dragon" -> score += level * 3.75;
                    case "Miner" -> score += level * 2.858;
                    case "Electro Dragon" -> score += level * 6.25;
                    case "Yeti" -> score += level * 8.334;
                    case "Dragon Rider" -> score += level * 8.334; 
                    case "Minion" -> score += level * 2;
                    case "Hog Rider" -> score += level * 2;
                    case "Valkyrie" -> score += 1.667;
                    case "Golem" -> score += level * 1.5;
                    case "Witch" -> score += level * 5;
                    case "Lava Hound" -> score += level * 3.334;
                    case "Bowler" -> score += level * 4;
                    case "Ice Golem" -> score += level * 3.334;
                    case "Headhunter" -> score += level * 5;
                    // siege machines
                    case "Wall Wrecker" -> score += level * 5; // 전차
                    case "Battle Blimp" -> score += level * 7.5; // 전비
                    case "Stone Slammer" -> score += level * 5; // 돌풍
                    case "Siege Barracks" -> score += level * 5; // 훈련소
                    case "Log Launcher" -> score += level * 7.5; // 통나무
                    // spells
                    case "Lightning Spell" -> score += level * 2.223;
                    case "Healing Spell" -> score += level * 3.75;
                    case "Rage Spell" -> score += level * 5;
                    case "Jump Spell" -> score += level * 7.5;
                    case "Freeze Spell" -> score += level * 4.286;
                    case "Clone Spell" -> score += level * 1.429;
                    case "Invisibility Spell" -> score += level * 5;
                    case "Poison Spell" -> score += level * 3.125;
                    case "Earthquake Spell" -> score += level * 5;
                    case "Haste Spell" -> score += level * 5;
                    case "Skeleton Spell" -> score += level * 2.143;
                    case "Bat Spell" -> score += level * 4;
                    // heroes
                    case "Barbarian King" -> score += level * 0.625;
                    case "Archer Queen" -> score += level * 0.625;
                    case "Grand Warden" -> score += level * 0.91;
                    case "Royal Champion" -> score += level * 1.667;
                    // pets
                    case "L.A.S.S.I" -> score += level * 3;
                    case "Electro Owl" -> score += level * 3;
                    case "Mighty Yak" -> score += level * 3;
                    case "Unicorn" -> score += level * 3;
                }
            }
        }
        return score;
    }

    @AllArgsConstructor
    private static class YonghaScoreThread extends Thread {
        ClanMember clanMember;

        public void run() {
            clanMember.setYonghaScore((int) Math.round(calYonghaScore(clanMember.getTag())));
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
                    Object troopsObject=body.get("troops");
                    clanMember.setTroops(troopsObject);
                    List<LinkedHashMap<Object, Object>> troopList = (List<LinkedHashMap<Object, Object>>) troopsObject;
                    score += calListScore(troopList);
                }
                if (body.get("heroes") != null) {
                    Object heroesObject=body.get("heroes");
                    clanMember.setHeroes(heroesObject);
                    List<LinkedHashMap<Object, Object>> heroList = (List<LinkedHashMap<Object, Object>>) heroesObject;
                    score += calListScore(heroList);
                }
                if (body.get("spells") != null) {
                    Object spellsObject=body.get("spells");
                    clanMember.setSpells(spellsObject);
                    List<LinkedHashMap<Object, Object>> spellList = (List<LinkedHashMap<Object, Object>>) spellsObject;
                    score += calListScore(spellList);
                }
                if (body.get("townHallLevel") != null) {
                    clanMember.setTownHallLevel((int) body.get("townHallLevel"));
                }
                if (body.get("townHallWeaponLevel") != null) {
                    clanMember.setTownHallWeaponLevel((int) body.get("townHallWeaponLevel"));
                }
                if (body.get("bestTrophies") != null) {
                    clanMember.setBestTrophies((int) body.get("bestTrophies"));
                }
                if (body.get("warStars") != null) {
                    clanMember.setWarStars((int) body.get("warStars"));
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
                    clanMember.setLabels(labelList);
                }
            } catch (Exception e) {
                e.printStackTrace();
                return -1;
            }
            return score;
        }
    }
}
