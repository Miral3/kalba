package kr.kalba.infrastructure.constant

enum class Errors(
    val code: Int,
    val message: String
) {
    COMMON_UNKNOWN_ERROR(1, "알수없는 오류가 발생했습니다."),
    COMMON_UNKNOWN_HEADER(2, "헤더 정보가 올바르지 않습니다"),
    COMMON_UNKNOWN_PARAM(3, "입력 정보가 올바르지 않습니다"),

    REGISTER_DUPLICATE_NAME(10, "이미 가입된 아이디입니다."),
    REGISTER_DUPLICATE_TAG(11, "이미 가입된 태그입니다."),

    LOGIN_DISABLE_USER(20, "존재하지 않는 아이디입니다."),
    LOGIN_INVALID_PASSWORD(21, "잘못된 비밀번호를 입력하였습니다."),

    COC_API_CLAN(30, "clan 조회 api 호출에 실패하였습니다."),
    COC_API_PLAYER(31, "player 조회 api 호출에 실패하였습니다."),
    COC_API_VERITY_USER_TOKEN(32, "token 검증 api 호출에 실패하였습니다."),

    MONGO_MEMBER_STATISTIC_LOAD(40, "멤버의 상세 정보 로딩을 실패하였습니다.")
}