package kalba.controller;

import kalba.model.ClanId;
import kalba.model.ClanMember;
import kalba.model.League;
import kalba.model.YonghaScore;
import lombok.AllArgsConstructor;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

@RestController
@RequestMapping("/coc/clan")
public class ClanController {
//            String token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjRkMWY1NzVlLWI4ZmUtNDI2YS05M2E1LWUxMGM3MmU5MWVhNCIsImlhdCI6MTYxNzUxNTAyMiwic3ViIjoiZGV2ZWxvcGVyL2M0MWNmYzkyLTNmMzktYThiMC0xM2UxLTkwMmRjNjE4NWRkNSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjExMC4zNS41MC43MyJdLCJ0eXBlIjoiY2xpZW50In1dfQ.o-FyYhqCW4xGzk86rS-E3WCTiw8JEaPDPBNjtvcmoulO82NSRJvHIXrdD1GtLaOGAbqVaFy2doxZqH59VSq7Aw";
    // Neverland server
    static String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImRiYzY1MjY2LTQ1MDItNDdhYS1hOTVmLWJiMWE2MTI5Yzc1YSIsImlhdCI6MTYxNzYyOTgzMywic3ViIjoiZGV2ZWxvcGVyL2M0MWNmYzkyLTNmMzktYThiMC0xM2UxLTkwMmRjNjE4NWRkNSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjM0LjY0LjIzNy4xNyJdLCJ0eXBlIjoiY2xpZW50In1dfQ.Yo-QMJuhPro85ZMu_nueuO5cs09ST4smYoQv4zAa_FUViBY6ZTwGD9rbqegnwKszcfnpnjpK_QMMTT_5R0RuyA";

    @SuppressWarnings("unchecked")
    private Map<Object, Object> getClanInfo(String id) {
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
    private List<ClanMember> getClanMemberList(String id) {
        Map<Object, Object> clanInfo = getClanInfo(id);
        Object memberListObj = clanInfo.get("memberList");
        if (memberListObj == null) {
            return new LinkedList<>();
        }
        List<LinkedHashMap<Object, Object>> memberList = (ArrayList<LinkedHashMap<Object, Object>>) memberListObj;
        List<ClanMember> clanMemberList = new LinkedList<>();
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
        } catch (Exception e) {
            e.printStackTrace();
            return new LinkedList<>();
        }
        return clanMemberList;
    }

    @ResponseBody
    @PostMapping("info")
    public Map<Object, Object> clanInfo(@RequestBody ClanId id) {
        return getClanInfo(id.getId());
    }

    @ResponseBody
    @PostMapping("/donations/rank")
    public List<ClanMember> memberDonationRank(@RequestBody ClanId id) {
        List<ClanMember> clanMemberList = getClanMemberList(id.getId());
        Collections.sort(clanMemberList);
        return clanMemberList;
    }

    @ResponseBody
    @PostMapping("/score/rank")
    public List<YonghaScore> memberYonghaScoreRank(@RequestBody ClanId id) {
        List<ClanMember> clanMemberList = getClanMemberList(id.getId());
        List<YonghaScore> yonghaScoreList = Collections.synchronizedList(new LinkedList<>());
        ArrayList<Thread> threads = new ArrayList<>();
        for (ClanMember clanMember : clanMemberList) {
            Thread thread = new YonghaScoreThread(clanMember.getName(), clanMember.getTag(), clanMember.getTrophies(), yonghaScoreList);
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
        Collections.sort(yonghaScoreList);
        return yonghaScoreList;
    }

    private double calListScore(List<LinkedHashMap<Object, Object>> list) {
        double score = 0;
        for (LinkedHashMap<Object, Object> troop : list) {
            if (troop.get("village").equals("home")) {
                int level = (int) troop.get("level");
                String name = (String) troop.get("name");
                switch (name) {
                    // unit
                    case "Barbarian" -> score += level * 1.1111;
                    case "Archer" -> score += level * 1.6667;
                    case "Giant", "Golem" -> score += level * 1.5;
                    case "Goblin", "Valkyrie" -> score += level * 1.875;
                    case "Wall Breaker", "Balloon" -> score += level * 2.7778;
                    case "Wizard", "Hog Rider" -> score += level * 3;
                    case "Healer", "Witch" -> score += level * 5;
                    case "Dragon" -> score += level * 2.5;
                    case "P.E.K.K.A" -> score += level * 3.3333;
                    case "Baby Dragon" -> score += level * 3.5714;
                    case "Miner" -> score += level * 4.2857;
                    case "Electro Dragon" -> score += level * 7.5;
                    case "Yeti" -> score += level * 10;
                    case "Minion" -> score += level * 2.2222;
                    case "Lava Hound" -> score += level * 4.1667;
                    case "Bowler" -> score += level * 6;
                    case "Ice Golem" -> score += level * 4;
                    case "Headhunter" -> score += level * 6.6667;
                    // siege machines
                    case "Wall Wrecker" -> score += level * 5; // 전차
                    case "Battle Blimp" -> score += level * 7.5; // 전비
                    case "Stone Slammer" -> score += level * 5; // 돌풍
                    case "Siege Barracks" -> score += level * 6.25; // 훈련소
                    case "Log Launcher" -> score += level * 7.5; // 통나무
                    // spells
                    case "Lightning Spell" -> score += level * 2.2222;
                    case "Healing Spell" -> score += level * 3.75;
                    case "Rage Spell" -> score += level * 5;
                    case "Jump Spell" -> score += level * 7.5;
                    case "Freeze Spell" -> score += level * 4.2857;
                    case "Poison Spell" -> score += level * 4.2857;
                    case "Earthquake Spell" -> score += level * 5;
                    case "Haste Spell" -> score += level * 5;
                    case "Clone Spell" -> score += level * 2.5;
                    case "Skeleton Spell" -> score += level * 1.4286;
                    case "Bat Spell" -> score += level * 4;
                    case "Invisibility Spell" -> score += level * 6.25;
                    // heroes
                    case "Barbarian King" -> score += level * 0.6667;
                    case "Archer Queen" -> score += level * 0.6667;
                    case "Grand Warden" -> score += level;
                    case "Royal Champion" -> score += level * 2;
                }
            }
        }
        return score;
    }

    private String encodeUTF8(String userTag) {
        return URLEncoder.encode(userTag, StandardCharsets.UTF_8);
    }

    @AllArgsConstructor
    private class YonghaScoreThread extends Thread {
        String name;
        String userTag;
        int trophies;
        List<YonghaScore> yonghaScoreList;

        public void run() {
            yonghaScoreList.add(new YonghaScore(name, (int) Math.round(calYonghaScore(userTag)), trophies));
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
                    List<LinkedHashMap<Object, Object>> troopList = (List<LinkedHashMap<Object, Object>>) body.get("troops");
                    score += calListScore(troopList);
                }
                if (body.get("heroes") != null) {
                    List<LinkedHashMap<Object, Object>> heroList = (List<LinkedHashMap<Object, Object>>) body.get("heroes");
                    score += calListScore(heroList);
                }
                if (body.get("spells") != null) {
                    List<LinkedHashMap<Object, Object>> spellList = (List<LinkedHashMap<Object, Object>>) body.get("spells");
                    score += calListScore(spellList);
                }
            } catch (Exception e) {
                e.printStackTrace();
                return -1;
            }
            return score;
        }
    }
}