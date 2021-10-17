package kalba.models.account;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class AccountQuizAndState {
    String name;
    String nickname;
    String tag;
    boolean member;
    boolean attackState;
    boolean warningState;
    int quizScore;
}
