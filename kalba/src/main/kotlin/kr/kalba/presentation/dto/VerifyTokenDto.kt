package kr.kalba.presentation.dto

class VerifyTokenDto {
    class Request(
        val tag: String,
        val token: String
    )

    class Response(
        val status: String
    ) {
        companion object {
            fun of(status: String): Response = Response(status)
        }
    }
}