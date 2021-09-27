package kalba.controller;

import kalba.models.account.Name;
import kalba.models.coc.clan.ClanInfo;
import kalba.models.coc.clan.Ranking;
import kalba.models.coc.clan.Statistic;
import kalba.service.ClanMemberService;
import kalba.models.coc.clan.ClanTag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<?> forceUpdateClanInfo(@RequestBody ClanTag tag) {
        if(clanMemberService.forceUpdate(tag.getTag())){
            return ResponseEntity.ok(Map.of("message", "강제 갱신에 성공하였습니다."));
        } else {
            return new ResponseEntity<>(HttpStatus.RESET_CONTENT);
        }
    }

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