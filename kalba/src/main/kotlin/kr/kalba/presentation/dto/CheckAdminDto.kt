package kr.kalba.presentation.dto

class CheckAdminDto {
    class Response(
        val isAdmin: Boolean
    ) {
        companion object {
            fun of(isAdmin: Boolean): Response = Response(isAdmin)
        }
    }
}