package kr.kalba.presentation.dto

class MemberStatisticDto {
    class NameRequest(
        val name: String
    )

    class TagRequest(
        val tag: String
    )

    class Response(
        val tag: String
    ) {
        companion object {
            fun of(tag: String): Response = Response(tag)
        }
    }
}