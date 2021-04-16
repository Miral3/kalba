package kalba.controller;

import kalba.handler.ClanMemberHandler;
import kalba.model.ClanId;
import kalba.model.ClanMember;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/coc/clan")
public class ClanController {
    //    static String token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjRkMWY1NzVlLWI4ZmUtNDI2YS05M2E1LWUxMGM3MmU5MWVhNCIsImlhdCI6MTYxNzUxNTAyMiwic3ViIjoiZGV2ZWxvcGVyL2M0MWNmYzkyLTNmMzktYThiMC0xM2UxLTkwMmRjNjE4NWRkNSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjExMC4zNS41MC43MyJdLCJ0eXBlIjoiY2xpZW50In1dfQ.o-FyYhqCW4xGzk86rS-E3WCTiw8JEaPDPBNjtvcmoulO82NSRJvHIXrdD1GtLaOGAbqVaFy2doxZqH59VSq7Aw";
    // Neverland server
    static String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImRiYzY1MjY2LTQ1MDItNDdhYS1hOTVmLWJiMWE2MTI5Yzc1YSIsImlhdCI6MTYxNzYyOTgzMywic3ViIjoiZGV2ZWxvcGVyL2M0MWNmYzkyLTNmMzktYThiMC0xM2UxLTkwMmRjNjE4NWRkNSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjM0LjY0LjIzNy4xNyJdLCJ0eXBlIjoiY2xpZW50In1dfQ.Yo-QMJuhPro85ZMu_nueuO5cs09ST4smYoQv4zAa_FUViBY6ZTwGD9rbqegnwKszcfnpnjpK_QMMTT_5R0RuyA";

    @ResponseBody
    @PostMapping("info")
    public Map<Object, Object> clanInfo(@RequestBody ClanId id) {
        while (ClanMemberHandler.loadingMap.get(id.getId()).get()) ;
        return ClanMemberHandler.clanInfoMap.get(id.getId());
    }

    @ResponseBody
    @PostMapping("/donations/rank")
    public List<ClanMember> memberDonationRank(@RequestBody ClanId id) {
        while (ClanMemberHandler.loadingMap.get(id.getId()).get()) ;
        return ClanMemberHandler.clanMemberSortedByDonationsMap.get(id.getId());
    }

    @ResponseBody
    @PostMapping("/score/rank")
    public List<ClanMember> memberYonghaScoreRank(@RequestBody ClanId id) {
        while (ClanMemberHandler.loadingMap.get(id.getId()).get()) ;
        return ClanMemberHandler.clanMemberSortedByYHScoreMap.get(id.getId());
    }

    @ResponseBody
    @PostMapping("/force/update")
    public Map<String, String> forceUpdateClanInfo(@RequestBody ClanId id){
        Map<String, String> result=new HashMap<>();
        if(ClanMemberHandler.updateClanInfo(id.getId())){
            result.put("status", "200");
            result.put("message", "강제 갱신에 성공하였습니다.");
        } else {
            result.put("status", "205");
            result.put("message", "강제 갱신 중 문제가 발생하였습니다.");
        }
        return result;
    }
}