package kr.kalba.presentation.dto

class UpdateDto {
    class Request(
        val tag: String
    ) {
        constructor() : this(tag = "")
    }

    class Response(
        val message: String
    ) {
        companion object {
            fun of(message: String): Response = Response(message)
        }
    }
}