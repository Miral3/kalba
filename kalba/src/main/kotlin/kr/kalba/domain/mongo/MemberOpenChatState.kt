package kr.kalba.domain.mongo

import org.springframework.data.mongodb.core.mapping.Document

@Document("member-open-chat-state")
class MemberOpenChatState(
    val tag: String,
    val openChatState: OpenChatStateType
)

enum class OpenChatStateType(val type: String) {
    MEMBER("member"),
    LEADER("leader"),
    SUB_LEADER("sub_leader"),
    NOT_MEMBER("notMember")
}