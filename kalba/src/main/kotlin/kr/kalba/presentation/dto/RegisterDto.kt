package kr.kalba.presentation.dto

class RegisterDto {
    class Request(
        val nickName: String,
        val tag: String,
        val name: String,
        val password: String
    )

    class Response(
        val message: String
    ) {
        companion object{
            fun of(message: String): Response = Response(message)
        }
    }
}