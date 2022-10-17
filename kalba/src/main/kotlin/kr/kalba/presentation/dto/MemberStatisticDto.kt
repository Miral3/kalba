package kr.kalba.presentation.dto

class MemberStatisticDto {
    class NameRequest(
        val name: String
    )

    class TagRequest(
        val tag: String
    )

    class Response(
        val bestTrophies: Int,
        val clanRank: Int,
        val donationRank: Int,
        val donations: Int,
        val donationsReceived: Int,
        val expLevel: Int,
        val heroes: List<Hero>,
        val labels: List<Label>,
        val league: List<League>,
        val name: String,
        val previousClanRank: Int,
        val role: String,
        val spells: List<Spell>,
        val tag: String,
        val townHallLevel: Int,
        val townHallWeaponLevel: Int,
        val troops: List<Troop>,
        val trophies: Int,
        val versusTrophies: Int,
        val warStars: Int,
        val yonghaScore: Int,
        val yonghaScoreRank: Int,
    )

    class Hero(
        val level: Int,
        val maxLevel: Int,
        val name: String,
        val village: String
    )

    class Label(
        val id: Int,
        val mediumIcon: String,
        val name: String,
        val smallIcon: String
    )

    class League(
        val id: Int,
        val name: String,
        val iconTiny: String,
        val iconSmall: String,
        val iconMedium: String
    )

    class Spell(
        val level: Int,
        val maxLevel: Int,
        val name: String,
        val village: String
    )

    class Troop(
        val level: Int,
        val maxLevel: Int,
        val name: String,
        val village: String
    )
}