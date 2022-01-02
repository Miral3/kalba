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
public class FormulaForMongoDB {
    LinkedHashMap<String, FormulaDataForMongoDB> heroes;
    LinkedHashMap<String, FormulaDataForMongoDB> pets;
    LinkedHashMap<String, FormulaDataForMongoDB> units;
    LinkedHashMap<String, FormulaDataForMongoDB> spells;
    LinkedHashMap<String, FormulaDataForMongoDB> siegeMachines;
}
