package kalba.models.coc.yongha;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.LinkedHashMap;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Formula {
    LinkedHashMap<String, FormulaData> heroes;
    LinkedHashMap<String, FormulaData> pets;
    LinkedHashMap<String, FormulaData> units;
    LinkedHashMap<String, FormulaData> spells;
    LinkedHashMap<String, FormulaData> siegeMachines;
}
