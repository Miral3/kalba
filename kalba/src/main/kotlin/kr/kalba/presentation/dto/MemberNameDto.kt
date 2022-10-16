package kr.kalba.presentation.dto

class MemberNameDto {
    class Request(
        val tag: String
    )

    class Response(
        val name: String
    ) {
        companion object {
            fun of(name: String): Response = Response(name)
        }
    }
}