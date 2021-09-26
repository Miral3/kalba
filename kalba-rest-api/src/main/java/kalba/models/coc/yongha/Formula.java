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
    LinkedHashMap<String, Double> heroes;
    LinkedHashMap<String, Double> pets;
    LinkedHashMap<String, Double> units;
    LinkedHashMap<String, Double> spells;
    LinkedHashMap<String, Double> siegeMachines;
}
