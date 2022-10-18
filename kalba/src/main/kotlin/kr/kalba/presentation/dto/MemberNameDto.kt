package kr.kalba.presentation.dto

class MemberNameDto {
    class Request(
        val name: String
    )

    class Response(
        val tag: String
    ) {
        companion object {
            fun of(name: String): Response = Response(name)
        }
    }
}