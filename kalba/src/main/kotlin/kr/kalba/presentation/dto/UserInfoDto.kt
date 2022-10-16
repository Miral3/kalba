package kr.kalba.presentation.dto

class UserInfoDto {
    class Request(
        val name: String
    )

    class Response(
        val name: String,
        val tag: String,
        val nickName: String,
        val role: String,
        val attackState: Boolean,
        val warningState: Boolean
    ) {
        companion object {
            fun of(
                name: String,
                tag: String,
                nickName: String,
                role: String,
                attackState: Boolean,
                warningState: Boolean
            ): Response = Response(name, tag, nickName, role, attackState, warningState)
        }
    }

    class BulkResponse(val list: List<Response>) {
        companion object {
            fun of(list: List<Response>): BulkResponse = BulkResponse(list)
        }
    }
}