package kr.kalba.presentation.dto

import kr.kalba.domain.mongo.Account
import kr.kalba.domain.mongo.OpenChatStateType

class UserInfoAllDto {
    class Request(
        val name: String
    )

    class Data(
        val accountName: String,
        val tag: String,
        val cocName: String,
        val role: String,
        val attackState: Boolean,
        val warningState: Boolean,
        val openChatStateType: OpenChatStateType
    ) {
        companion object {
            fun of(account: Account, openChatStateType: OpenChatStateType): Data = Data(
                accountName = account.accountName,
                tag = account.tag,
                cocName = account.cocName,
                role = account.role,
                attackState = account.attackState,
                warningState = account.warningState,
                openChatStateType = openChatStateType
            )
        }
    }

    class Response(val list: List<Data>) {
        companion object {
            fun of(list: List<Data>): Response = Response(list)
        }
    }
}