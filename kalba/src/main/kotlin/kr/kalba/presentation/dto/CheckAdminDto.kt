package kr.kalba.presentation.dto

class CheckAdminDto {

    class Request(
        val token: String
    )

    class Response(
        val admin: Boolean
    ) {
        companion object {
            fun of(admin: Boolean): Response = Response(admin)
        }
    }
}