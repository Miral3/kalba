package kalba.models.coc.yongha;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Formula {
    List<FormulaData> heroes;
    List<FormulaData> pets;
    List<FormulaData> units;
    List<FormulaData> spells;
    List<FormulaData> siegeMachines;

    public boolean isEmpty(String className) {
        boolean ret = false;
        switch (className) {
            case "heroes" -> ret = heroes != null;
            case "pets" -> ret = pets != null;
            case "units" -> ret = units != null;
            case "spells" -> ret = spells != null;
            case "siegeMachines" -> ret = siegeMachines != null;
        }
        return ret;
    }

    public List<FormulaData> classNameToFormula(String className) {
        List<FormulaData> ret = null;
        switch (className) {
            case "heroes" -> ret = heroes;
            case "pets" -> ret = pets;
            case "units" -> ret = units;
            case "spells" -> ret = spells;
            case "siegeMachines" -> ret = siegeMachines;
        }
        return ret;
    }
}