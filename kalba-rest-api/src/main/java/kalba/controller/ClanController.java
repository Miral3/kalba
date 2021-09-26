package kalba.controller;

import kalba.models.account.Name;
import kalba.models.coc.clan.ClanInfo;
import kalba.models.coc.clan.Ranking;
import kalba.models.coc.clan.Statistic;
import kalba.service.ClanMemberService;
import kalba.models.coc.clan.ClanTag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/coc/clan")
@AllArgsConstructor
public class ClanController {
    private final ClanMemberService clanMemberService;

    @ResponseBody
    @PostMapping("info")
    public ClanInfo clanInfo(@RequestBody ClanTag id) {
        return clanMemberService.findClanInfo(id.getTag());
    }

    @ResponseBody
    @PostMapping("/donations/rank")
    public List<Statistic> memberDonationRank(@RequestBody ClanTag clanTag) {
        return clanMemberService.findClanMemberStatistic(clanTag.getTag());
    }

    @ResponseBody
    @PostMapping("/score/rank")
    public List<Statistic> memberYonghaScoreRank(@RequestBody ClanTag tag) {
        return clanMemberService.findClanMemberStatistic(tag.getTag());
    }

    @ResponseBody
    @PostMapping("/force/update")
    public Map<String, String> forceUpdateClanInfo(@RequestBody ClanTag tag) {
//        Map<String, String> result = new HashMap<>();
//        if (ClanMemberService.updateClanInfo(id.getId())) {
//            result.put("status", "200");
//            result.put("message", "강제 갱신에 성공하였습니다.");
//        } else {
//            result.put("status", "205");
//            result.put("message", "강제 갱신 중 문제가 발생하였습니다.");
//        }
//        return result;
        return Map.of("error", "임시 중단");
    }

//    @ResponseBody
//    @PostMapping("/member/name")
//    public ResponseEntity<?> getNameByTag(@RequestBody Tag tag) {
//        return ClanMemberService.findNameByTag(tag.getTag())
//                .<ResponseEntity<?>>map(name -> ResponseEntity.ok(Map.of("name", name)))
//                .orElseGet(() -> ResponseEntity.ok(Map.of("message", "invalid tag")));
//    }
//
//    @ResponseBody
//    @PostMapping("/member/tag")
//    public ResponseEntity<?> getTagByName(@RequestBody Name name) {
//        return ClanMemberService.findTagByName(name.getName())
//                .<ResponseEntity<?>>map(tag -> ResponseEntity.ok(Map.of("tag", tag)))
//                .orElseGet(() -> ResponseEntity.ok(Map.of("message", "invalid name")));
//    }

    @ResponseBody
    @PostMapping("/member/tag")
    public ResponseEntity<?> getTagByName(@RequestBody Name name) {
        return ResponseEntity.ok(Map.of("tag", clanMemberService.findByName(name.getName()).getTag()));
    }

    @ResponseBody
    @PostMapping("/member/statistic/name")
    public ResponseEntity<?> findByName(@RequestBody Name name) {
        return ResponseEntity.ok(clanMemberService.findByName(name.getName()));
    }

    @ResponseBody
    @GetMapping("/formula")
    public ResponseEntity<?> yonghaScoreFormula() {
        return clanMemberService.findYonghaScoreFormula()
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.ok(Map.of("message", "get formula error")));
    }
}