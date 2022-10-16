package kr.kalba.presentation.dto

class MemberTagDto {
    class Request(
        val name: String
    )

    class Response(
        val tag: String
    ) {
        companion object {
            fun of(tag: String): Response = Response(tag)
        }
    }
}