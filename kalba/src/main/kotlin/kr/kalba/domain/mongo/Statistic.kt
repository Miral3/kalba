package kr.kalba.domain.mongo

import kr.kalba.infrastructure.external.coc.dto.PlayerData
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.MongoId

@Document("statistic")
class Statistic(
    @MongoId
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
    val labels: List<PlayerLabel>,
    val bestTrophies: Int,
    val warStars: Int,
    val troops: List<Resource>,
    val heroes: List<Resource>,
    val spells: List<Resource>,
    val townHallWeaponLevel: Int
) {
    companion object {
        fun of(member: Clan.ClanMember, score: Int, playerData: PlayerData): Statistic {
            return Statistic(
                tag = member.tag,
                name = member.name,
                role = member.role,
                expLevel = member.expLevel,
                league = member.league,
                trophies = member.trophies,
                versusTrophies = member.versusTrophies,
                clanRank = member.clanRank,
                previousClanRank = member.previousClanRank,
                donations = member.donations,
                donationsReceived = member.donationsReceived,

                score = score,

                townHallLevel = playerData.townHallLevel,
                labels = playerData.labels.map { PlayerLabel.of(it) },
                bestTrophies = playerData.bestTrophies,
                warStars = playerData.warStars,
                troops = playerData.troops.map { Resource.of(it) },
                heroes = playerData.heroes.map { Resource.of(it) },
                spells = playerData.spells.map { Resource.of(it) },
                townHallWeaponLevel = playerData.townHallWeaponLevel
            )
        }
    }

    class PlayerLabel(
        val id: Int,
        val name: String,
        val smallIcon: String,
        val mediumIcon: String
    ) {
        companion object {
            fun of(label: PlayerData.LabelData): PlayerLabel {
                return PlayerLabel(
                    id = label.id,
                    name = label.name,
                    smallIcon = label.iconUrls.small,
                    mediumIcon = label.iconUrls.medium
                )
            }
        }
    }

    class Resource(
        val name: String,
        val level: Int,
        val maxLevel: Int,
        val village: String
    ) {
        companion object {
            fun of(resourceData: PlayerData.ResourceData): Resource {
                return Resource(
                    name = resourceData.name,
                    level = resourceData.level,
                    maxLevel = resourceData.maxLevel,
                    village = resourceData.village
                )
            }
        }
    }
}