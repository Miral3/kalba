package kr.kalba.presentation.dto

import kr.kalba.presentation.dto.meta.CommonMeta
import kr.kalba.domain.mongo.League
import kr.kalba.domain.mongo.Statistic

class MemberStatisticDto {
    class NameRequest(
        val name: String
    )

    class TagRequest(
        val tag: String
    )

    class Response(
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
        val townHallWeaponLevel: Int
    ) : CommonMeta() {
        companion object {
            fun of(statistic: Statistic): Response {
                return Response(
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
                    townHallWeaponLevel = statistic.townHallWeaponLevel
                )
            }
        }
    }

//    class Hero(
//        val level: Int,
//        val maxLevel: Int,
//        val name: String,
//        val village: String
//    )
//
//    class Label(
//        val id: Int,
//        val mediumIcon: String,
//        val name: String,
//        val smallIcon: String
//    )
//
//    class League(
//        val id: Int,
//        val name: String,
//        val iconTiny: String,
//        val iconSmall: String,
//        val iconMedium: String
//    )
//
//    class Spell(
//        val level: Int,
//        val maxLevel: Int,
//        val name: String,
//        val village: String
//    )
//
//    class Troop(
//        val level: Int,
//        val maxLevel: Int,
//        val name: String,
//        val village: String
//    )
}