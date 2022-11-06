package kr.kalba.infrastructure.external.coc.dto

import com.fasterxml.jackson.annotation.JsonProperty

data class VerifyTokenResponse(
    @JsonProperty("tag")
    val tag: String,
    @JsonProperty("token")
    val token: String,
    @JsonProperty("status")
    val status: String,
)
