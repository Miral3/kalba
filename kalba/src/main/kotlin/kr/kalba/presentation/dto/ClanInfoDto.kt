package kr.kalba.presentation.dto

import kr.kalba.presentation.dto.meta.CommonMeta
import kr.kalba.domain.mongo.Clan

class ClanInfoDto {
    class Request(
        val tag: String
    )

    class Response(
        val warLeague: Any,
        val memberList: List<Clan.ClanMember>,
        val tag: String,
        val clanLevel: Int,
        val warWinStreak: Int,
        val warWins: Int,
        val warTies: Int,
        val warLosses: Int,
        val clanPoints: Int,
        val chatLanguage: Any,
        val isWarLogPublic: Boolean,
        val warFrequency: Any,
        val clanVersusPoints: Int,
        val requiredTrophies: Int,
        val requiredVersusTrophies: Int,
        val requiredTownhallLevel: Int,
        val labels: List<Any>,
        val name: String,
        val location: Any,
        val type: Any,
        val members: Int,
        val description: String,
        val clanCapital: Any,
        val badgeUrls: Any,
    ) : CommonMeta() {
        companion object {
            fun of(clan: Clan): Response {
                return Response(
                    warLeague = clan.warLeague,
                    memberList = clan.memberList,
                    tag = clan.tag,
                    clanLevel = clan.clanLevel,
                    warWinStreak = clan.warWinStreak,
                    warWins = clan.warWins,
                    warTies = clan.warTies,
                    warLosses = clan.warLosses,
                    clanPoints = clan.clanPoints,
                    chatLanguage = clan.chatLanguage,
                    isWarLogPublic = clan.isWarLogPublic,
                    warFrequency = clan.warFrequency,
                    clanVersusPoints = clan.clanVersusPoints,
                    requiredTrophies = clan.requiredTrophies,
                    requiredVersusTrophies = clan.requiredVersusTrophies,
                    requiredTownhallLevel = clan.requiredTownhallLevel,
                    labels = clan.labels,
                    name = clan.name,
                    location = clan.location,
                    type = clan.type,
                    members = clan.members,
                    description = clan.description,
                    clanCapital = clan.clanCapital,
                    badgeUrls = clan.badgeUrls
                )
            }
        }
    }
}