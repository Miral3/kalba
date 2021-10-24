package kalba.models.coc.yongha;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FormulaUpdateInfo {
    String name;
    Map<String, FormulaData> formulaDataObject;

    public boolean validateFormulaName() {
        switch (this.name) {
            case "units", "siegeMachines", "spells", "heroes", "pets" -> {
                return true;
            }
            default -> {
                return false;
            }
        }
    }
}
