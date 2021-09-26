package kalba.models.coc.clan;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClanInfo {
    String tag;
    String name;
    String type;
    String description;
    Object location;
    Object badgeUrls;
    int clanLevel;
    int clanPoints;
    int clanVersusPoints;
    int requiredTrophies;
    String warFrequency;
    int warWinStreak;
    int warWins;
    boolean isWarLogPublic;
    Object warLeague;
    int members;
    Object memberList;
    Object labels;
    Object chatLanguage;
    int requiredVersusTrophies;
    int requiredTownhallLevel;
}