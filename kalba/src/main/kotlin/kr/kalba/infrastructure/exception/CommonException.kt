package kr.kalba.infrastructure.exception

import kr.kalba.infrastructure.constant.Errors

class CommonException(
    val error: Errors,
) : RuntimeException()