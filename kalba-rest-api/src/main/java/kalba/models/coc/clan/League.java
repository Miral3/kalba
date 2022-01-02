package kalba.models.coc.clan;

import lombok.Data;

@Data
public class League {
    int id;
    String name;
    String iconTiny;
    String iconSmall;
    String iconMedium;

    public String getIconMedium() {
        if (iconMedium == null) {
            return iconSmall;
        }
        return iconMedium;
    }
}