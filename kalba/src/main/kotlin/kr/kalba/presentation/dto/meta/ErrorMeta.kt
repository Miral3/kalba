package kr.kalba.presentation.dto.meta

open class ErrorMeta(val code: Int, val resultMsg: String) : CommonMeta(Result.fail)