package kr.kalba.presentation.dto

class ClanInfoDto {
    class Request(
        val tag: String
    )

    class Response(
        val tag: String,
        val name: String,
        val type: String,
        val description: String,
        val location: Any,
        val badgeUrls: Any,
        val clanLevel: Int,
        val clanPoints: Int,
        val clanVersusPoints: Int,
        val requiredTrophies: Int,
        val warFrequency: String,
        val warWinStreak: Int,
        val warWins: Int,
        val isWarLogPublic: Boolean,
        val warLeague: Any,
        val members: Int,
        val memberList: Any,
        val labels: Any,
        val chatLanguage: Any,
        val requiredVersusTrophies: Int,
        val requiredTownhallLevel: Int
    )
}