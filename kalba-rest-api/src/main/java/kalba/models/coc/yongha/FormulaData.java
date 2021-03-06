package kalba.models.coc.yongha;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FormulaData {
    String english;
    int index;
    String korean;
    double value;
    int maxScore;
    int maxLevel;
}