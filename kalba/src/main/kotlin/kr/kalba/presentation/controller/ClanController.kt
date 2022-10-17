package kr.kalba.presentation.controller

import com.fasterxml.jackson.databind.ObjectMapper
import kr.kalba.presentation.dto.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/coc/clan")
class ClanController {

    @GetMapping("/info")
    fun clanInfo(): ResponseEntity<ClanInfoDto.Response> {
        return ResponseEntity.status(HttpStatus.OK).body(
            ClanInfoDto.Response(
                clanLevel = 16,
                clanPoints = 39466,
                clanVersusPoints = 40931,
                description = "성인클랜 / Only Korean\n★톡방 공지사항 반드시 확인★\n오픈톡방 불참 시 추방. 반드시 참여\n검색어: ‘칼바’, ‘칼 없는 바바리안’",
                members = 47,
                name = "칼 없는 바바리안",
                requiredTownhallLevel = 12,
                requiredTrophies = 0,
                requiredVersusTrophies = 0,
                tag = "#2Y2Y9YCUU",
                type = "open",
                warFrequency = "always",
                warLogPublic = true,
                warWinStreak = 0,
                warWins = 61,
                badgeUrls = ClanInfoDto.BadgeUrls(
                    large = "https://api-assets.clashofclans.com/badges/512/kBkfXdQxnIeKWoV-wLXGfk7VPG7_B5Lk-jDd2tN7u-8.png",
                    medium = "https://api-assets.clashofclans.com/badges/200/kBkfXdQxnIeKWoV-wLXGfk7VPG7_B5Lk-jDd2tN7u-8.png",
                    small = "https://api-assets.clashofclans.com/badges/70/kBkfXdQxnIeKWoV-wLXGfk7VPG7_B5Lk-jDd2tN7u-8.png"
                ),
                chatLanguage = ClanInfoDto.ChatLanguage(
                    id = 75000011,
                    languageCode = "KR",
                    name = "한국어"
                ),
                labels = listOf(
                    ClanInfoDto.Label(
                        mediumIcon = "https://api-assets.clashofclans.com/labels/128/lXaIuoTlfoNOY5fKcQGeT57apz1KFWkN9-raxqIlMbE.png",
                        smallIcon = "https://api-assets.clashofclans.com/labels/64/lXaIuoTlfoNOY5fKcQGeT57apz1KFWkN9-raxqIlMbE.png",
                        id = 56000000,
                        name = "Clan Wars"
                    )
                ),
                location = ClanInfoDto.Location(
                    countryCode = "KR",
                    id = 32000216,
                    isCountry = true,
                    name = "South Korea"
                ),
                memberList = listOf(
                    ClanInfoDto.Member(
                        clanRank = 1,
                        donations = 6607,
                        donationsReceived = 6235,
                        expLevel = 225,
                        name = "별별",
                        previousClanRank = 1,
                        role = "coLeader",
                        tag = "#CPLLJLPC",
                        trophies = 5379,
                        versusTrophies = 4657,
                        league = ClanInfoDto.League(
                            iconMedium = "https://api-assets.clashofclans.com/leagues/288/R2zmhyqQ0_lKcDR5EyghXCxgyC9mm_mVMIjAbmGoZtw.png",
                            iconSmall = "https://api-assets.clashofclans.com/leagues/72/R2zmhyqQ0_lKcDR5EyghXCxgyC9mm_mVMIjAbmGoZtw.png",
                            iconTiny = "https://api-assets.clashofclans.com/leagues/36/R2zmhyqQ0_lKcDR5EyghXCxgyC9mm_mVMIjAbmGoZtw.png",
                            id = 29000022,
                            name = "Legend League"
                        )
                    ),
                ),
                warLeague = ClanInfoDto.WarLeague(
                    id = 48000012,
                    name = "Crystal League I"
                )
            )
        )
    }

    @ResponseBody
    @GetMapping("/rank")
    fun memberStatisticRank(@RequestParam request: ClanRankDto.Request): ResponseEntity<ClanRankDto.Response> {
        return ResponseEntity.status(HttpStatus.OK).body(
            ClanRankDto.Response(
                listOf(
                    ClanRankDto.Data(
                        ClanRankDto.League(
                            iconMedium = "https://api-assets.clashofclans.com/leagues/288/R2zmhyqQ0_lKcDR5EyghXCxgyC9mm_mVMIjAbmGoZtw.png",
                            iconSmall = "https://api-assets.clashofclans.com/leagues/72/R2zmhyqQ0_lKcDR5EyghXCxgyC9mm_mVMIjAbmGoZtw.png",
                            iconTiny = "https://api-assets.clashofclans.com/leagues/36/R2zmhyqQ0_lKcDR5EyghXCxgyC9mm_mVMIjAbmGoZtw.png",
                            id = 29000022,
                            name = "Legend League"
                        ),
                        name = "천사",
                        role = "coLeader",
                        tag = "#2J20228CG",
                        townHallLevel = 15,
                        trophies = 5167,
                        yonghaScore = 1287,
                        yonghaScoreRank = 5,
                        donationRank = 2,
                        donations = 8192
                    )
                )
            )
        )
    }

    @ResponseBody
    @PutMapping("/update")
    fun forceUpdateClanInfo(@RequestBody tag: UpdateDto.Request): ResponseEntity<UpdateDto.Response>? {
        return ResponseEntity.status(HttpStatus.OK).body(UpdateDto.Response("강제 갱신에 성공하였습니다."))
    }

    @ResponseBody
    @GetMapping("/member/tag")
    fun getTagByName(@RequestParam name: MemberNameDto.Request): ResponseEntity<MemberNameDto.Response>? {
        return ResponseEntity.status(HttpStatus.OK).body(MemberNameDto.Response.of("#123"))
    }

    @ResponseBody
    @GetMapping("/member/name")
    fun getTagByTag(@RequestParam tag: MemberTagDto.Request): ResponseEntity<MemberTagDto.Response>? {
        return ResponseEntity.status(HttpStatus.OK).body(MemberTagDto.Response.of("용하"))
    }

    @ResponseBody
    @GetMapping("/member/statistic/name")
    fun findByName(@RequestParam name: MemberStatisticDto.NameRequest): ResponseEntity<*> {
        return ResponseEntity.status(HttpStatus.OK).body(
            MemberStatisticDto.Response(
                bestTrophies = 3247,
                clanRank = 33,
                donationRank = 1,
                donations = 11161,
                donationsReceived = 13588,
                expLevel = 142,
                heroes = listOf(
                    MemberStatisticDto.Hero(
                        level = 51,
                        maxLevel = 85,
                        name = "Barbarian King",
                        village = "home"
                    )
                ),
                labels = listOf(
                    MemberStatisticDto.Label(
                        id = 57000000,
                        mediumIcon = "https://api-assets.clashofclans.com/labels/128/ZxJp9606Vl1sa0GHg5JmGp8TdHS4l0jE4WFuil1ENvA.png",
                        name = "Clan Wars",
                        smallIcon = "https://api-assets.clashofclans.com/labels/64/ZxJp9606Vl1sa0GHg5JmGp8TdHS4l0jE4WFuil1ENvA.png"
                    )
                ),
                league = listOf(
                    MemberStatisticDto.League(
                        iconMedium = "https://api-assets.clashofclans.com/leagues/288/pSXfKvBKSgtvfOY3xKkgFaRQi0WcE28s3X35ywbIluY.png",
                        iconSmall = "https://api-assets.clashofclans.com/leagues/72/pSXfKvBKSgtvfOY3xKkgFaRQi0WcE28s3X35ywbIluY.png",
                        iconTiny = "https://api-assets.clashofclans.com/leagues/36/pSXfKvBKSgtvfOY3xKkgFaRQi0WcE28s3X35ywbIluY.png",
                        id = 29000013,
                        name = "Master League III"
                    )
                ),
                name = "제논",
                previousClanRank = 34,
                role = "coLeader",
                spells = listOf(
                    MemberStatisticDto.Spell(
                        level = 8,
                        maxLevel = 10,
                        name = "Lightning Spell",
                        village = "home"
                    )
                ),
                tag = "#QGLQRRPG9",
                townHallLevel = 12,
                townHallWeaponLevel = 5,
                troops = listOf(
                    MemberStatisticDto.Troop(
                        level = 5,
                        maxLevel = 11,
                        name = "Barbarian",
                        village = "home"
                    )
                ),
                trophies = 2630,
                versusTrophies = 3126,
                warStars = 265,
                yonghaScore = 600,
                yonghaScoreRank = 31
            )
        )
    }

    @ResponseBody
    @GetMapping("/member/statistic/tag")
    fun findByTag(@RequestParam tag: MemberStatisticDto.TagRequest): ResponseEntity<MemberStatisticDto.Response> {
        return ResponseEntity.status(HttpStatus.OK).body(
            MemberStatisticDto.Response(
                bestTrophies = 3247,
                clanRank = 33,
                donationRank = 1,
                donations = 11161,
                donationsReceived = 13588,
                expLevel = 142,
                heroes = listOf(
                    MemberStatisticDto.Hero(
                        level = 51,
                        maxLevel = 85,
                        name = "Barbarian King",
                        village = "home"
                    )
                ),
                labels = listOf(
                    MemberStatisticDto.Label(
                        id = 57000000,
                        mediumIcon = "https://api-assets.clashofclans.com/labels/128/ZxJp9606Vl1sa0GHg5JmGp8TdHS4l0jE4WFuil1ENvA.png",
                        name = "Clan Wars",
                        smallIcon = "https://api-assets.clashofclans.com/labels/64/ZxJp9606Vl1sa0GHg5JmGp8TdHS4l0jE4WFuil1ENvA.png"
                    )
                ),
                league = listOf(
                    MemberStatisticDto.League(
                        iconMedium = "https://api-assets.clashofclans.com/leagues/288/pSXfKvBKSgtvfOY3xKkgFaRQi0WcE28s3X35ywbIluY.png",
                        iconSmall = "https://api-assets.clashofclans.com/leagues/72/pSXfKvBKSgtvfOY3xKkgFaRQi0WcE28s3X35ywbIluY.png",
                        iconTiny = "https://api-assets.clashofclans.com/leagues/36/pSXfKvBKSgtvfOY3xKkgFaRQi0WcE28s3X35ywbIluY.png",
                        id = 29000013,
                        name = "Master League III"
                    )
                ),
                name = "제논",
                previousClanRank = 34,
                role = "coLeader",
                spells = listOf(
                    MemberStatisticDto.Spell(
                        level = 8,
                        maxLevel = 10,
                        name = "Lightning Spell",
                        village = "home"
                    )
                ),
                tag = "#QGLQRRPG9",
                townHallLevel = 12,
                townHallWeaponLevel = 5,
                troops = listOf(
                    MemberStatisticDto.Troop(
                        level = 5,
                        maxLevel = 11,
                        name = "Barbarian",
                        village = "home"
                    )
                ),
                trophies = 2630,
                versusTrophies = 3126,
                warStars = 265,
                yonghaScore = 600,
                yonghaScoreRank = 31
            )
        )
    }

    @ResponseBody
    @GetMapping("/formula")
    fun yonghaScoreFormula(): ResponseEntity<FormulaDto.Response> {
        return ResponseEntity.status(HttpStatus.OK).body(
            FormulaDto.Response(
                heroes = listOf(
                    FormulaDto.Data(
                        english = "Barbarian King",
                        index = 0,
                        korean = "바바리안 킹",
                        maxLevel = 80,
                        maxScore = 50,
                        value = 0.625
                    )
                ),
                pets = listOf(
                    FormulaDto.Data(
                        english = "bBarbarian King",
                        index = 0,
                        korean = "b바바리안 킹",
                        maxLevel = 80,
                        maxScore = 50,
                        value = 0.625
                    )
                ),
                siegeMachines = listOf(
                    FormulaDto.Data(
                        english = "cBarbarian King",
                        index = 0,
                        korean = "c바바리안 킹",
                        maxLevel = 80,
                        maxScore = 50,
                        value = 0.625
                    )
                ),
                spells = listOf(
                    FormulaDto.Data(
                        english = "dBarbarian King",
                        index = 0,
                        korean = "d바바리안 킹",
                        maxLevel = 80,
                        maxScore = 50,
                        value = 0.625
                    )
                ),
                units = listOf(
                    FormulaDto.Data(
                        english = "eBarbarian King",
                        index = 0,
                        korean = "e바바리안 킹",
                        maxLevel = 80,
                        maxScore = 50,
                        value = 0.625
                    )
                )
            )
        )
    }

    @ResponseBody
    @PutMapping("/formula")
    fun updateYonghaScoreFormula(@RequestBody request: FormulaDto.Request): ResponseEntity<*> {
        return ResponseEntity.status(HttpStatus.OK).body(mapOf(Pair("message", "asdf")))
    }
}
