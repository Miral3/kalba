package kalba.controller;

import kalba.models.account.Name;
import kalba.models.account.Tag;
import kalba.service.ClanMemberService;
import kalba.models.coc.ClanId;
import kalba.models.coc.ClanMember;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/coc/clan")
public class ClanController {
    @ResponseBody
    @PostMapping("info")
    public Map<Object, Object> clanInfo(@RequestBody ClanId id) {
        while (ClanMemberService.loadingMap.get(id.getId()).get()) ;
        return ClanMemberService.clanInfoMap.get(id.getId());
    }

    @ResponseBody
    @PostMapping("/donations/rank")
    public List<ClanMember> memberDonationRank(@RequestBody ClanId id) {
        while (ClanMemberService.loadingMap.get(id.getId()).get()) ;
        return ClanMemberService.clanMemberSortedByDonationsMap.get(id.getId());
    }

    @ResponseBody
    @PostMapping("/score/rank")
    public List<ClanMember> memberYonghaScoreRank(@RequestBody ClanId id) {
        while (ClanMemberService.loadingMap.get(id.getId()).get()) ;
        return ClanMemberService.clanMemberSortedByYHScoreMap.get(id.getId());
    }

    @ResponseBody
    @PostMapping("/force/update")
    public Map<String, String> forceUpdateClanInfo(@RequestBody ClanId id) {
        Map<String, String> result = new HashMap<>();
        if (ClanMemberService.updateClanInfo(id.getId())) {
            result.put("status", "200");
            result.put("message", "강제 갱신에 성공하였습니다.");
        } else {
            result.put("status", "205");
            result.put("message", "강제 갱신 중 문제가 발생하였습니다.");
        }
        return result;
    }

    @ResponseBody
    @PostMapping("/member/name")
    public ResponseEntity<?> getNameByTag(@RequestBody Tag tag) {
        return ClanMemberService.findNameByTag(tag.getTag())
                .<ResponseEntity<?>>map(name -> ResponseEntity.ok(Map.of("name", name)))
                .orElseGet(() -> ResponseEntity.ok(Map.of("message", "invalid tag")));
    }

    @ResponseBody
    @PostMapping("/member/tag")
    public ResponseEntity<?> getTagByName(@RequestBody Name name) {
        return ClanMemberService.findTagByName(name.getName())
                .<ResponseEntity<?>>map(tag -> ResponseEntity.ok(Map.of("tag", tag)))
                .orElseGet(() -> ResponseEntity.ok(Map.of("message", "invalid name")));
    }
}