package kr.kalba.infrastructure.external.coc.dto

import com.fasterxml.jackson.annotation.JsonProperty

data class ClanData(
    @JsonProperty("warLeague")
    val warLeague: Any,
    @JsonProperty("memberList")
    val memberList: List<Any>,
    @JsonProperty("tag")
    val tag: String,
    @JsonProperty("clanLevel")
    val clanLevel: Int,
    @JsonProperty("warWinStreak")
    val warWinStreak: Int,
    @JsonProperty("warWins")
    val warWins: Int,
    @JsonProperty("warTies")
    val warTies: Int,
    @JsonProperty("warLosses")
    val warLosses: Int,
    @JsonProperty("clanPoints")
    val clanPoints: Int,
    @JsonProperty("chatLanguage")
    val chatLanguage: Any,
    @JsonProperty("isWarLogPublic")
    val isWarLogPublic: Boolean,
    @JsonProperty("warFrequency")
    val warFrequency: Any,
    @JsonProperty("clanVersusPoints")
    val clanVersusPoints: Int,
    @JsonProperty("requiredTrophies")
    val requiredTrophies: Int,
    @JsonProperty("requiredVersusTrophies")
    val requiredVersusTrophies: Int,
    @JsonProperty("requiredTownhallLevel")
    val requiredTownhallLevel: Int,
    @JsonProperty("labels")
    val labels: List<Any>,
    @JsonProperty("name")
    val name: String,
    @JsonProperty("location")
    val location: Any,
    @JsonProperty("type")
    val type: Any,
    @JsonProperty("members")
    val members: Int,
    @JsonProperty("description")
    val description: String,
    @JsonProperty("clanCapital")
    val clanCapital: Any,
    @JsonProperty("badgeUrls")
    val badgeUrls: Any
)
