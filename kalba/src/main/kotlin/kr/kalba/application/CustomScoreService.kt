package kr.kalba.application

import kr.kalba.domain.mongo.Clan
import kr.kalba.domain.mongo.Formula
import kr.kalba.domain.mongo.Statistic
import kr.kalba.infrastructure.external.coc.ClashOfClanService
import kr.kalba.infrastructure.external.coc.dto.PlayerData
import kr.kalba.infrastructure.repository.FormulaRepository
import kr.kalba.infrastructure.repository.StatisticRepository
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Service
import org.springframework.util.ObjectUtils
import kotlin.math.roundToInt

@Service
class CustomScoreService(
    val clashOfClanService: ClashOfClanService,
    val formulaRepository: FormulaRepository,
    val statisticRepository: StatisticRepository
) {

    @Async
    fun updateMemberInfo(member: Clan.ClanMember) {
        val playerData = clashOfClanService.getUserInfo(member.tag)
        val formula = formulaRepository.findAll().associateBy { it.name }
        statisticRepository.save(Statistic.of(member, calculateCustomScore(playerData, formula), playerData))
    }

    fun calculateCustomScore(playerData: PlayerData, formula: Map<String, Formula>): Int {

        val resources = playerData.troops + playerData.spells + playerData.heroes
        var score = 0.0
        resources.filter { it.village == "home" }.forEach {
            if (!ObjectUtils.isEmpty(formula[it.name])) {
                score += it.level * formula[it.name]!!.value
            }
        }
        return score.roundToInt()
    }

    fun test(members: List<Clan.ClanMember>) {
        val memberMap = members.associateBy { it.tag }
        val formula = formulaRepository.findAll().associateBy { it.name }

        val memberStatistics = clashOfClanService.getUserInfoBulk(members.map { it.tag })
            .map { Statistic.of(memberMap[it.tag]!!, calculateCustomScore(it, formula), it) }

        val scoreRankMap = memberStatistics.sortedBy { it.score }.reversed()
            .mapIndexed { index, statistic -> statistic.tag to index }.toMap()
        val donationRankMap = memberStatistics.sortedBy { it.donations }.reversed()
            .mapIndexed { index, statistic -> statistic.tag to index }.toMap()

        memberStatistics.forEach {
            it.scoreRank = scoreRankMap[it.tag]!! + 1
            it.donationRank = donationRankMap[it.tag]!! + 1
        }
        statisticRepository.saveAll(memberStatistics)

    }
}