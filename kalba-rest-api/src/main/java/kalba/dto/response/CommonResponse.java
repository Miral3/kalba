package kalba.dto.response;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CommonResponse {
    private String message;

    public CommonResponse(String message) {
        this.message = message;
    }
}
