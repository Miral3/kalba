package kalba.models.coc.clan;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Ranking {
    Object league;
    String name;
    String tag;
    String role;
    int trophies;
    int townHallLevel;
    int donations;
    int yonghaScore;
    int yonghaScoreRank;
    int donationRank;
}