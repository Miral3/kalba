package kalba.models.coc.yongha;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormulaData{
    int index;
    String korean;
    double value;
    int maxScore;
    int maxLevel;
}