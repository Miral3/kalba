package kr.kalba.presentation.dto

import kr.kalba.presentation.dto.meta.ErrorMeta

class ErrorResponse(code: Int, resultMsg: String) : ErrorMeta(code, resultMsg) {
    companion object {
        fun of(code: Int, message: String): ErrorResponse {
            return ErrorResponse(code, message)
        }
    }
}