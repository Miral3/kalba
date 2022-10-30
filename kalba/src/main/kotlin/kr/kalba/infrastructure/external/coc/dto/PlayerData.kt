package kr.kalba.infrastructure.external.coc.dto

import com.fasterxml.jackson.annotation.JsonProperty

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
    )

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
    }
}
