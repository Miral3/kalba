package kr.kalba.presentation.controller

import kr.kalba.presentation.dto.meta.CommonMeta
import kr.kalba.application.ClanService
import kr.kalba.application.FormulaService
import kr.kalba.presentation.dto.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/coc/clan")
class ClanController(
    val clanService: ClanService,
    val formulaService: FormulaService
) {

    @GetMapping("/info")
    fun clanInfo(): ResponseEntity<ClanInfoDto.Response> {
        return ResponseEntity.status(HttpStatus.OK).body(
            ClanInfoDto.Response.of(clanService.getClanInfo())
        )
    }

    @ResponseBody
    @GetMapping("/rank")
    fun memberStatisticRank(): ResponseEntity<ClanRankDto.Response> {
        return ResponseEntity.status(HttpStatus.OK).body(
            ClanRankDto.Response(
                clanService.getAllMemberStatistic().map { ClanRankDto.Data.of(it) }
            )
        )
    }

    @ResponseBody
    @PutMapping("/update")
    fun forceUpdateClanInfo(@RequestBody tag: UpdateDto.Request): ResponseEntity<UpdateDto.Response>? {
        clanService.updateClanInfo()
        return ResponseEntity.status(HttpStatus.OK).body(UpdateDto.Response("갱신 요청을 보냈습니다."))
    }

    @ResponseBody
    @GetMapping("/member/tag")
    fun getTagByName(@RequestParam name: MemberNameDto.Request): ResponseEntity<MemberNameDto.Response>? {
        return ResponseEntity.status(HttpStatus.OK).body(
            MemberNameDto.Response.of(
                clanService.getMemberStatisticByName(name.name).tag
            )
        )
    }

    @ResponseBody
    @GetMapping("/member/name")
    fun getTagByTag(@RequestParam tag: MemberTagDto.Request): ResponseEntity<MemberTagDto.Response>? {
        return ResponseEntity.status(HttpStatus.OK).body(
            MemberTagDto.Response.of(
                clanService.getMemberStatisticByTag(tag.tag).name
            )
//            MemberTagDto.Response.of("용하")
        )
    }

    @ResponseBody
    @GetMapping("/member/statistic/name")
    fun findByName(@RequestParam name: MemberStatisticDto.NameRequest): ResponseEntity<*> {
        return ResponseEntity.status(HttpStatus.OK).body(
            MemberStatisticDto.Response.of(clanService.getMemberStatisticByName(name.name))
        )
    }

    @ResponseBody
    @GetMapping("/member/statistic/tag")
    fun findByTag(@RequestParam tag: MemberStatisticDto.TagRequest): ResponseEntity<MemberStatisticDto.Response> {
        return ResponseEntity.status(HttpStatus.OK).body(
            MemberStatisticDto.Response.of(clanService.getMemberStatisticByTag(tag.tag))
        )
    }

    @ResponseBody
    @GetMapping("/formula")
    fun scoreFormula(): ResponseEntity<FormulaReadDto.Response> {
        return ResponseEntity.status(HttpStatus.OK).body(
            FormulaReadDto.Response(
                formula = formulaService.getFormula().map { FormulaReadDto.Data.of(it) }
            )
        )
    }

    @ResponseBody
    @PutMapping("/formula")
    fun updateScoreFormula(@RequestBody request: FormulaUpdateDto.Request): ResponseEntity<*> {
        return ResponseEntity.status(HttpStatus.OK).body(CommonMeta())
    }

    @ResponseBody
    @DeleteMapping("/formula")
    fun deleteScoreFormula(@RequestBody request: FormulaUpdateDto.Request): ResponseEntity<*> {
        return ResponseEntity.status(HttpStatus.OK).body(CommonMeta())
    }
}
