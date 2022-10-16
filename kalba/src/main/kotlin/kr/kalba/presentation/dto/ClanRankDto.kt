package kr.kalba.presentation.dto

class ClanRankDto {
    class Request(
        val tag: String
    )

    class Response(
        val list: List<Data>
    )

    class Data(
        val league: League,
        val name: String,
        val tag: String,
        val role: String,
        val trophies: Int,
        val townHallLevel: Int,
        val donations: Int,
        val yonghaScore: Int,
        val yonghaScoreRank: Int,
        val donationRank: Int
    )

    class League(
        val id: Int,
        val name: String,
        val iconTiny: String,
        val iconSmall: String,
        val iconMedium: String
    )
}