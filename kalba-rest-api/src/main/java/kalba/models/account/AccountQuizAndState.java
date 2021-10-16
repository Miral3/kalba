package kalba.models.account;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccountQuizAndState {
    String name;
    String nickname;
    String tag;
    boolean member;
    boolean attackState;
    boolean warningState;
    int quizScore;
}
