package kr.kalba.presentation.dto

import kr.kalba.domain.mongo.League
import kr.kalba.domain.mongo.OpenChatStateType
import kr.kalba.domain.mongo.Statistic

class MemberStatisticAllDto {

    class Data(
        val tag: String,
        val name: String,
        val role: String,
        val expLevel: Int,
        val league: League?,
        val trophies: Int,
        val versusTrophies: Int,
        val clanRank: Int,
        val previousClanRank: Int,
        val donations: Int,
        val donationsReceived: Int,

        val score: Int,
        val townHallLevel: Int,
        val labels: List<Statistic.PlayerLabel>,
        val bestTrophies: Int,
        val warStars: Int,
        val troops: List<Statistic.Resource>,
        val heroes: List<Statistic.Resource>,
        val spells: List<Statistic.Resource>,
        val townHallWeaponLevel: Int,

        val donationRank: Int,
        val scoreRank: Int,

        val openChatStateType: OpenChatStateType
    ) {
        companion object {
            fun of(statistic: Statistic, openChatStateType: OpenChatStateType): Data {
                return Data(
                    tag = statistic.tag,
                    name = statistic.name,
                    role = statistic.role,
                    expLevel = statistic.expLevel,
                    league = statistic.league,
                    trophies = statistic.trophies,
                    versusTrophies = statistic.versusTrophies,
                    clanRank = statistic.clanRank,
                    previousClanRank = statistic.previousClanRank,
                    donations = statistic.donations,
                    donationsReceived = statistic.donationsReceived,

                    score = statistic.score,
                    townHallLevel = statistic.townHallLevel,
                    labels = statistic.labels,
                    bestTrophies = statistic.bestTrophies,
                    warStars = statistic.warStars,
                    troops = statistic.troops,
                    heroes = statistic.heroes,
                    spells = statistic.spells,
                    townHallWeaponLevel = statistic.townHallWeaponLevel,

                    donationRank = statistic.donationRank,
                    scoreRank = statistic.scoreRank,

                    openChatStateType = openChatStateType
                )
            }
        }
    }
}