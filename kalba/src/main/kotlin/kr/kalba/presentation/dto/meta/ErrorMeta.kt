package kr.kalba.presentation.dto.meta

class ErrorMeta(val code: Int, val resultMsg: String) : CommonMeta(Result.fail)