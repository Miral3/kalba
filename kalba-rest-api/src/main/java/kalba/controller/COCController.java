package kalba.controller;

import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/coc")
public class COCController {
    @RequestMapping("/")
    public String helloKalba() {
        return "hello";
    }

    @ResponseBody
    @PostMapping("clan_info")
    @SuppressWarnings("unchecked")
    public Map<Object, Object> clanInfo(@RequestParam(value="id") String id) {
        Map<Object, Object> result = new HashMap<>();
        String token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjRkMWY1NzVlLWI4ZmUtNDI2YS05M2E1LWUxMGM3MmU5MWVhNCIsImlhdCI6MTYxNzUxNTAyMiwic3ViIjoiZGV2ZWxvcGVyL2M0MWNmYzkyLTNmMzktYThiMC0xM2UxLTkwMmRjNjE4NWRkNSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjExMC4zNS41MC43MyJdLCJ0eXBlIjoiY2xpZW50In1dfQ.o-FyYhqCW4xGzk86rS-E3WCTiw8JEaPDPBNjtvcmoulO82NSRJvHIXrdD1GtLaOGAbqVaFy2doxZqH59VSq7Aw";
        try {
            HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
            factory.setConnectTimeout(5000); //타임아웃 설정 5초
            factory.setReadTimeout(5000);//타임아웃 설정 5초
            RestTemplate restTemplate = new RestTemplate(factory);
            HttpHeaders header = new HttpHeaders();
            header.setBearerAuth(token);
            header.add("Accept", "*/*");
            header.setContentType(MediaType.APPLICATION_JSON);
            URI url=URI.create("https://api.clashofclans.com/v1/clans/"+id);
            ResponseEntity<Object> res=restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(header), Object.class);
            result= (Map<Object, Object>) res.getBody();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            result.put("statusCode", e.getRawStatusCode());
            result.put("statusText"  , e.getStatusText());
            e.printStackTrace();
        } catch (Exception e) {
            result.put("statusCode", "3032");
            result.put("statusText", "error");
            e.printStackTrace();
        }
        return result;
    }

    @ResponseBody
    @PostMapping("clan_member_info")
    @SuppressWarnings("unchecked")
    public Map<Object, Object> clanMemberInfo(@RequestParam(value="id") String id) {
        Map<Object, Object> result = new HashMap<>();
        String token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjRkMWY1NzVlLWI4ZmUtNDI2YS05M2E1LWUxMGM3MmU5MWVhNCIsImlhdCI6MTYxNzUxNTAyMiwic3ViIjoiZGV2ZWxvcGVyL2M0MWNmYzkyLTNmMzktYThiMC0xM2UxLTkwMmRjNjE4NWRkNSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjExMC4zNS41MC43MyJdLCJ0eXBlIjoiY2xpZW50In1dfQ.o-FyYhqCW4xGzk86rS-E3WCTiw8JEaPDPBNjtvcmoulO82NSRJvHIXrdD1GtLaOGAbqVaFy2doxZqH59VSq7Aw";
        try {
            HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
            factory.setConnectTimeout(5000); //타임아웃 설정 5초
            factory.setReadTimeout(5000);//타임아웃 설정 5초
            RestTemplate restTemplate = new RestTemplate(factory);
            HttpHeaders header = new HttpHeaders();
            header.setBearerAuth(token);
            header.add("Accept", "*/*");
            header.setContentType(MediaType.APPLICATION_JSON);
            URI url=URI.create("https://api.clashofclans.com/v1/clans/"+id);
            ResponseEntity<Object> res=restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(header), Object.class);
            ArrayList<LinkedHashMap<Object, Object>> memberList= (ArrayList<LinkedHashMap<Object, Object>>) ((Map<Object, Object>) res.getBody()).get("memberList");
            System.out.println();
            result= (Map<Object, Object>) res.getBody();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            result.put("statusCode", e.getRawStatusCode());
            result.put("statusText"  , e.getStatusText());
            e.printStackTrace();
        } catch (Exception e) {
            result.put("statusCode", "3032");
            result.put("statusText", "error");
            e.printStackTrace();
        }
        return result;
    }
}