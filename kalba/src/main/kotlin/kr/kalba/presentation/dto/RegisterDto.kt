package kr.kalba.presentation.dto

import kr.kalba.domain.mongo.Account

class RegisterDto {
    class Request(
        val accountName: String,
        val cocName: String,
        val tag: String,
        val password: String
    )

    class Response(
        val accountName: String,
        val cocName: String,
        val tag: String
    ) {
        companion object {
            fun of(account: Account): Response = Response(
                accountName = account.accountName,
                cocName = account.cocName,
                tag = account.tag
            )
        }
    }
}