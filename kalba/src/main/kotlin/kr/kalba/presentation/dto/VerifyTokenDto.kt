package kr.kalba.presentation.dto

class VerifyTokenDto {
    class Request(
        val tag: String,
        val token: String
    )

    class Response(
        val status: Boolean
    ) {
        companion object {
            fun of(status: String): Response {
                return if (status == "ok") {
                    Response(true)
                } else {
                    Response(false)
                }
            }
        }
    }
}