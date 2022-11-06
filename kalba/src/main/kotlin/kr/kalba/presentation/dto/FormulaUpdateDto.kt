package kr.kalba.presentation.dto

import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.databind.annotation.JsonNaming
import kr.kalba.domain.FormulaType
import kr.kalba.presentation.dto.meta.CommonMeta

class FormulaUpdateDto {

    class Request(
        @JsonProperty("list")
        val list: List<Data>,
        @JsonProperty("type")
        val type: FormulaType?
    )

    class Data(
        @JsonProperty("name")
        val name: String,
        @JsonProperty("korean")
        val korean: String,
        @JsonProperty("value")
        val value: Double,
        @JsonProperty("maxScore")
        val maxScore: Long,
        @JsonProperty("maxLevel")
        val maxLevel: Long,
        @JsonProperty("type")
        val type: String
    )
}