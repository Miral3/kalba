package kr.kalba.presentation.dto

class MemberTagDto {
    class Request(
        val tag: String
    )

    class Response(
        val name: String
    ) {
        companion object {
            fun of(tag: String): Response = Response(tag)
        }
    }
}