package kalba.advice;

import kalba.common.exception.AccountConflictException;
import kalba.dto.response.CommonResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class KalbaExceptionHandler {

    @ExceptionHandler(AccountConflictException.class)
    ResponseEntity<CommonResponse> handlerForAccountConflictException(final Exception exception) {
        log.info("exception: {}, message: {}", exception.getClass(), exception.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new CommonResponse(exception.getMessage()));
    }
}
