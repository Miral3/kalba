package kalba.models.coc.yongha;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FormulaDataForMongoDB {
    int index;
    String korean;
    double value;
    int maxScore;
    int maxLevel;
}