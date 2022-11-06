package kr.kalba.presentation.dto

import kr.kalba.presentation.dto.meta.CommonMeta
import kr.kalba.domain.mongo.League
import kr.kalba.domain.mongo.Statistic

class ClanRankDto {
    class Response(
        val sortedByScoreList: List<Data>,
        val sortedByDonationList: List<Data>
    )

    class Data(
        val league: League?,
        val name: String,
        val tag: String,
        val role: String,
        val trophies: Int,
        val townHallLevel: Int,
        val donations: Int,
        val score: Int,
    ) : CommonMeta() {
        companion object {
            fun of(statistic: Statistic): Data {
                return Data(
                    league = statistic.league,
                    name = statistic.name,
                    tag = statistic.tag,
                    role = statistic.role,
                    trophies = statistic.trophies,
                    townHallLevel = statistic.townHallLevel,
                    donations = statistic.donations,
                    score = statistic.score
                )
            }
        }
    }
}