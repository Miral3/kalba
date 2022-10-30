package kr.kalba.presentation.dto

class LoginDto {
    class Request(
        val accountName: String,
        val password: String
    )

    class Response(
        val token: String
    ) {
        companion object {
            fun of(token: String): Response = Response(token)
        }
    }
}