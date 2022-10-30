package kr.kalba.application

import kr.kalba.domain.mongo.Clan
import kr.kalba.domain.mongo.Statistic
import kr.kalba.infrastructure.external.coc.ClashOfClanService
import kr.kalba.infrastructure.repository.ClanRepository
import kr.kalba.infrastructure.repository.StatisticRepository
import org.springframework.stereotype.Service

@Service
class ClanService(
    private val clashOfClanService: ClashOfClanService,
    private val clanRepository: ClanRepository,
    private val customScoreService: CustomScoreService,
    private val statisticRepository: StatisticRepository
) {

    fun updateClanInfo() {
        val clan = Clan.of(clashOfClanService.getClanInfo())
        clanRepository.save(clan)

        clan.memberList.forEach {
            customScoreService.updateMemberInfo(it)
        }

        val newClanMember = clan.memberList.map { it.tag }.toSet()
        val existStatistics = statisticRepository.findAll().filterNot { newClanMember.contains(it.tag) }
        statisticRepository.deleteAll(existStatistics)
    }

    fun getMemberStatisticByTag(tag: String): Statistic {
        return statisticRepository.findById(tag).orElseThrow()
    }

    fun getMemberStatisticByName(name: String): Statistic {
        return statisticRepository.findByName(name).orElseThrow()
    }

    fun getClanInfo(): Clan {
        return clanRepository.findById("#2Y2Y9YCUU").orElseThrow()
    }

    fun getAllMemberStatistic(): List<Statistic> {
        return statisticRepository.findAll()
    }
}