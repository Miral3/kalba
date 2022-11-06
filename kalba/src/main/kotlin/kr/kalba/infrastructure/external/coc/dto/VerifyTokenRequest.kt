package kr.kalba.infrastructure.external.coc.dto

import com.fasterxml.jackson.annotation.JsonProperty

data class VerifyTokenRequest(
    @JsonProperty("tag")
    val token: String
)
