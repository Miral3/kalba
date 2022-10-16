package kr.kalba.presentation.dto

class LoginDto {
    class Request(
        val userName: String,
        val password: String
    )

    class Response(
        val token: String,
        val message: String
    ) {
        companion object {
            fun of(token: String, message: String): Response = Response(token, message)
        }
    }
}