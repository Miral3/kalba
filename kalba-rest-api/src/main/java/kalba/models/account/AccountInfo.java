package kalba.models.account;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountInfo {
    private String name;
    private String tag;
    private String nickname;
    private String role;
    private boolean attackState;
    private boolean warningState;
}