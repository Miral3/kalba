package kr.kalba.infrastructure.external.coc.dto

import com.fasterxml.jackson.annotation.JsonProperty
import kr.kalba.domain.mongo.Statistic

class PlayerData(
    @JsonProperty("tag")
    val tag: String,

    @JsonProperty("troops")
    val troops: List<ResourceData>,

    @JsonProperty("heroes")
    val heroes: List<ResourceData>,

    @JsonProperty("spells")
    val spells: List<ResourceData>,

    @JsonProperty("townHallLevel")
    val townHallLevel: Int,

    @JsonProperty("townHallWeaponLevel")
    val townHallWeaponLevel: Int,

    @JsonProperty("bestTrophies")
    val bestTrophies: Int,

    @JsonProperty("warStars")
    val warStars: Int,

    @JsonProperty("labels")
    val labels: List<LabelData>,
) {

    class ResourceData(
        @JsonProperty("name")
        val name: String,

        @JsonProperty("level")
        val level: Int,

        @JsonProperty("maxLevel")
        val maxLevel: Int,

        @JsonProperty("village")
        val village: String
    ) {
        companion object {
            fun of(resource: Statistic.Resource): ResourceData {
                return ResourceData(
                    name = resource.name,
                    level = resource.level,
                    maxLevel = resource.maxLevel,
                    village = resource.village
                )
            }
        }
    }

    class LabelData(
        @JsonProperty("id")
        val id: Int,
        @JsonProperty("name")
        val name: String,
        @JsonProperty("iconUrls")
        val iconUrls: IconUrls
    ) {
        class IconUrls(
            @JsonProperty("small")
            val small: String,
            @JsonProperty("medium")
            val medium: String
        )

        companion object {
            fun of(playerLabel: Statistic.PlayerLabel): LabelData {
                return LabelData(
                    id = playerLabel.id,
                    name = playerLabel.name,
                    iconUrls = IconUrls(playerLabel.smallIcon, playerLabel.mediumIcon)
                )
            }
        }
    }

    companion object {
        fun of(statistic: Statistic): PlayerData {
            return PlayerData(
                tag = statistic.tag,
                troops = statistic.troops.map { ResourceData.of(it) },
                heroes = statistic.heroes.map { ResourceData.of(it) },
                spells = statistic.spells.map { ResourceData.of(it) },
                townHallLevel = statistic.townHallLevel,
                townHallWeaponLevel = statistic.townHallWeaponLevel,
                bestTrophies = statistic.bestTrophies,
                warStars = statistic.warStars,
                labels = statistic.labels.map { LabelData.of(it) }
            )
        }
    }
}
