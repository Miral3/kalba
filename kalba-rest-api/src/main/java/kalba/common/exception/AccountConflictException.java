package kalba.common.exception;

public class AccountConflictException extends RuntimeException {
    private static final String ACCOUNT_CONFLICT_EXCEPTION_MSG = "존재하는 아이디입니다.";

    public AccountConflictException() {
        super(ACCOUNT_CONFLICT_EXCEPTION_MSG);
    }
}
