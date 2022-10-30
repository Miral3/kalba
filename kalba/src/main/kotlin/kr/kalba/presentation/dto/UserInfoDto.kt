package kr.kalba.presentation.dto

import kr.kalba.domain.mongo.Account

class UserInfoDto {
    class Request(
        val name: String
    )

    class Response(
        val accountName: String,
        val tag: String,
        val cocName: String,
        val role: String,
        val attackState: Boolean,
        val warningState: Boolean
    ) {
        companion object {
            fun of(account: Account): Response = Response(
                accountName = account.accountName,
                tag = account.tag,
                cocName = account.cocName,
                role = account.role,
                attackState = account.attackState,
                warningState = account.warningState
            )
        }
    }

    class BulkResponse(val list: List<Response>) {
        companion object {
            fun of(list: List<Response>): BulkResponse = BulkResponse(list)
        }
    }
}