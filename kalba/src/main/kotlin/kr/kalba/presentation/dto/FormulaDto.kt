package kr.kalba.presentation.dto

class FormulaDto {
    class Request(
    )

    class Response(
        val token: String,
        val message: String
    ) {
        companion object {
            fun of(token: String, message: String): Response = Response(token, message)
        }
    }
}