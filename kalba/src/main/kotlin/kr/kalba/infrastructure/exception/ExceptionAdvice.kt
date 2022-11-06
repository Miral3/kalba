package kr.kalba.infrastructure.exception

import kr.kalba.infrastructure.constant.Errors
import kr.kalba.presentation.dto.ErrorResponse
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletRequest

@ControllerAdvice
@RestController
class ExceptionAdvice {

    @ExceptionHandler(Exception::class)
    fun exception(request: HttpServletRequest, e: Exception): ResponseEntity<ErrorResponse> {
        val response: ErrorResponse =
            ErrorResponse.of(Errors.COMMON_UNKNOWN_ERROR.code, Errors.COMMON_UNKNOWN_ERROR.message)
        request.setAttribute("response", response)
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response)
    }

    @ExceptionHandler(CommonException::class)
    fun commonException(request: HttpServletRequest, e: CommonException): ResponseEntity<ErrorResponse> {
        val response: ErrorResponse =
            ErrorResponse.of(e.error.code, e.error.message)
        request.setAttribute("response", response)
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response)
    }
}