package kalba.controller;

import kalba.model.ClanMember;
import kalba.model.League;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.*;

@RestController
@RequestMapping("/coc/clan")
public class ClanController {
    static String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjRkMWY1NzVlLWI4ZmUtNDI2YS05M2E1LWUxMGM3MmU5MWVhNCIsImlhdCI6MTYxNzUxNTAyMiwic3ViIjoiZGV2ZWxvcGVyL2M0MWNmYzkyLTNmMzktYThiMC0xM2UxLTkwMmRjNjE4NWRkNSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjExMC4zNS41MC43MyJdLCJ0eXBlIjoiY2xpZW50In1dfQ.o-FyYhqCW4xGzk86rS-E3WCTiw8JEaPDPBNjtvcmoulO82NSRJvHIXrdD1GtLaOGAbqVaFy2doxZqH59VSq7Aw";

    @SuppressWarnings("unchecked")
    public Map<Object, Object> getClanInfo(String id) {
        Map<Object, Object> result = new HashMap<>();
        try {
            HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
            factory.setConnectTimeout(5000); //타임아웃 설정 5초
            factory.setReadTimeout(5000);//타임아웃 설정 5초
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
    public List<ClanMember> getClanMemberList(String id) {
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
                League league=new League();
                if(memberInfo.get("league")!=null){
                    LinkedHashMap<Object, Object> leagueInfo=(LinkedHashMap<Object, Object>)memberInfo.get("league");
                    league.setId((Integer) leagueInfo.get("id"));
                    league.setName((String) leagueInfo.get("name"));
                    LinkedHashMap<Object, Object> iconInfo=(LinkedHashMap<Object, Object>)leagueInfo.get("iconUrls");
                    league.setIconTiny((String)iconInfo.get("tiny"));
                    league.setIconSmall((String)iconInfo.get("small"));
                    league.setIconMedium((String)iconInfo.get("medium"));
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
    public Map<Object, Object> clanInfo(@RequestParam(value = "id") String id) {
        return getClanInfo(id);
    }

    @ResponseBody
    @PostMapping("/donations/rank")
    public List<ClanMember> memberDonationRank(@RequestParam(value = "id") String id) {
        List<ClanMember> clanMemberList=getClanMemberList(id);
        Collections.sort(clanMemberList);
        return clanMemberList;
    }
}