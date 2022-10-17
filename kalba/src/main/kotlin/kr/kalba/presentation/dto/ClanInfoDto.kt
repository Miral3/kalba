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
        val location: Location,
        val badgeUrls: BadgeUrls,
        val clanLevel: Int,
        val clanPoints: Int,
        val clanVersusPoints: Int,
        val requiredTrophies: Int,
        val warFrequency: String,
        val warWinStreak: Int,
        val warWins: Int,
        val warLogPublic: Boolean,
        val warLeague: WarLeague,
        val members: Int,
        val memberList: List<Member>,
        val labels: List<Label>,
        val chatLanguage: ChatLanguage,
        val requiredVersusTrophies: Int,
        val requiredTownhallLevel: Int
    )

    class Label(
        val id: Int,
        val name: String,
        val smallIcon: String,
        val mediumIcon: String
    )

    class Location(
        val countryCode: String,
        val id: Long,
        val isCountry: Boolean,
        val name: String
    )

    class League(
        val id: Int,
        val name: String,
        val iconTiny: String,
        val iconSmall: String,
        val iconMedium: String
    )

    class Member(
        val clanRank: Int,
        val donations: Int,
        val donationsReceived: Int,
        val expLevel: Int,
        val league: League,
        val name: String,
        val previousClanRank: Int,
        val role: String,
        val tag: String,
        val trophies: Int,
        val versusTrophies: Int
    )

    class BadgeUrls(
        val large: String,
        val medium: String,
        val small: String
    )

    class WarLeague(
        val id: Long,
        val name: String
    )

    class ChatLanguage(
        val id: Long,
        val languageCode: String,
        val name: String
    )
}