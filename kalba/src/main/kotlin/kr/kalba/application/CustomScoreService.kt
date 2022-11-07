package kr.kalba.application

import kr.kalba.domain.mongo.Clan
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
        statisticRepository.save(Statistic.of(member, calculateCustomScore(playerData), playerData))
    }

    fun calculateCustomScore(playerData: PlayerData): Int {
        val formula = formulaRepository.findAll().associateBy { it.name }
        val resources = playerData.troops + playerData.spells + playerData.heroes
        var score = 0.0
        resources.filter { it.village == "home" }.forEach {
            if (!ObjectUtils.isEmpty(formula[it.name])) {
                score += it.level * formula[it.name]!!.value
            }
        }
        return score.roundToInt()
    }

    fun test(tags: List<String>){
        clashOfClanService.zzz(tags)
    }
}