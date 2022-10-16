package kr.kalba.presentation.dto

class AccountStateDto {
    class Request(
        val clanTag: String
    )

    class Response(
        val list: List<AccountQuizAndState>
    )

    class AccountQuizAndState(
        val name: String,
        val nickname: String,
        val tag: String,
        val member: Boolean,
        val attackState: Boolean,
        val warningState: Boolean,
        val quizScore: Int
    )
}