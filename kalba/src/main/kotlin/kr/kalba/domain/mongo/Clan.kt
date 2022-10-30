package kr.kalba.domain.mongo

import kr.kalba.infrastructure.external.coc.dto.ClanData
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.MongoId
import org.springframework.util.ObjectUtils

@Document("clan")
class Clan(
    val warLeague: Any,
    val memberList: List<ClanMember>,
    @MongoId
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
) {
    companion object {
        fun of(clanData: ClanData): Clan {
            return Clan(
                warLeague = clanData.warLeague,
                memberList = clanData.memberList.map { ClanMember.of(it) },
                tag = clanData.tag,
                clanLevel = clanData.clanLevel,
                warWinStreak = clanData.warWinStreak,
                warWins = clanData.warWins,
                warTies = clanData.warTies,
                warLosses = clanData.warLosses,
                clanPoints = clanData.clanPoints,
                chatLanguage = clanData.chatLanguage,
                isWarLogPublic = clanData.isWarLogPublic,
                warFrequency = clanData.warFrequency,
                clanVersusPoints = clanData.clanVersusPoints,
                requiredTrophies = clanData.requiredTrophies,
                requiredVersusTrophies = clanData.requiredVersusTrophies,
                requiredTownhallLevel = clanData.requiredTownhallLevel,
                labels = clanData.labels,
                name = clanData.name,
                location = clanData.location,
                type = clanData.type,
                members = clanData.members,
                description = clanData.description,
                clanCapital = clanData.clanCapital,
                badgeUrls = clanData.badgeUrls,
            )
        }
    }

    class ClanMember(
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
        val donationsReceived: Int
    ) {
        companion object {
            fun of(member: Any): ClanMember {
                val memberInfo = member as Map<String, Any>
                return ClanMember(
                    tag = memberInfo["tag"] as String,
                    name = memberInfo["name"] as String,
                    role = memberInfo["role"] as String,
                    expLevel = memberInfo["expLevel"] as Int,
                    league = if (ObjectUtils.isEmpty(memberInfo["league"])) {
                        null
                    } else {
                        League.of(memberInfo["league"] as Map<String, Any>)
                    },
                    trophies = memberInfo["trophies"] as Int,
                    versusTrophies = memberInfo["versusTrophies"] as Int,
                    clanRank = memberInfo["clanRank"] as Int,
                    previousClanRank = memberInfo["previousClanRank"] as Int,
                    donations = memberInfo["donations"] as Int,
                    donationsReceived = memberInfo["donationsReceived"] as Int,
                )
            }
        }
    }
}