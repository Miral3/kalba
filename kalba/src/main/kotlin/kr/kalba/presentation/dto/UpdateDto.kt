package kr.kalba.presentation.dto

class UpdateDto {
    class Request(
        val tag: String
    )

    class Response(
        val message: String
    ) {
        companion object {
            fun of(message: String): Response = Response(message)
        }
    }
}