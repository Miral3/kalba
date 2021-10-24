package kalba.controller;

import kalba.models.account.AccountQuizAndState;
import kalba.models.account.Name;
import kalba.models.account.Tag;
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
    @PostMapping("/rank")
    public List<Ranking> memberStatisticRank(@RequestBody ClanTag tag) {
        return clanMemberService.findClanMemberStatistic(tag.getTag());
    }

    @ResponseBody
    @PostMapping("/force/update")
    public ResponseEntity<?> forceUpdateClanInfo(@RequestBody ClanTag tag) {
        if (clanMemberService.forceUpdate(tag.getTag())) {
            return ResponseEntity.ok(Map.of("message", "강제 갱신에 성공하였습니다."));
        } else {
            return new ResponseEntity<>(HttpStatus.RESET_CONTENT);
        }
    }

    @ResponseBody
    @PostMapping("/member/tag")
    public ResponseEntity<?> getTagByName(@RequestBody Name name) {
        return clanMemberService.findByName(name.getName())
                .<ResponseEntity<?>>map((tag) -> ResponseEntity.ok(Map.of("tag", tag.getTag())))
                .orElseGet(() -> new ResponseEntity<>(Map.of("message", "non existent name"), HttpStatus.NO_CONTENT));
    }

    @ResponseBody
    @PostMapping("/member/name")
    public ResponseEntity<?> getTagByTag(@RequestBody Tag tag) {
        return clanMemberService.findByTag(tag.getTag())
                .<ResponseEntity<?>>map((name) -> ResponseEntity.ok(Map.of("name", name.getName())))
                .orElseGet(() -> new ResponseEntity<>(Map.of("message", "non existent tag"), HttpStatus.NO_CONTENT));
    }


    @ResponseBody
    @PostMapping("/member/statistic/name")
    public ResponseEntity<?> findByName(@RequestBody Name name) {
        return ResponseEntity.ok(clanMemberService.findByName(name.getName()));
    }

    @ResponseBody
    @PostMapping("/member/statistic/tag")
    public ResponseEntity<?> findByTag(@RequestBody Tag tag) {
        return clanMemberService.findByTag(tag.getTag())
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(Map.of("message", "non existent tag"), HttpStatus.NO_CONTENT));
    }

    @ResponseBody
    @GetMapping("/formula")
    public ResponseEntity<?> yonghaScoreFormula() {
        return clanMemberService.findYonghaScoreFormula()
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.ok(Map.of("message", "get formula error")));
    }

    @PostMapping("/member/state")
    public ResponseEntity<?> getAllMemberAccountState(@RequestBody ClanTag clanTag) {
        return ResponseEntity.ok(clanMemberService.getMemberStateList(clanTag.getTag()));
    }

    @PutMapping("/member/state")
    public ResponseEntity<?> updateMemberAccountState(@RequestBody List<AccountQuizAndState> list) {
        if (clanMemberService.updateMemberState(list)) {
            return ResponseEntity.ok(Map.of("message", "변경 사항 저장에 성공하였습니다."));
        } else {
            return new ResponseEntity<>(HttpStatus.RESET_CONTENT);
        }
    }
}