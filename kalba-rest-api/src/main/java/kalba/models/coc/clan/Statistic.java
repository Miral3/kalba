package kalba.models.coc.clan;

import lombok.Data;

import java.util.List;

@Data
public class Statistic {
    private String tag;
    private String name;
    private String role;
    private int expLevel;
    private int trophies;
    private int versusTrophies;
    private int clanRank;
    private int previousClanRank;
    private int donations;
    private int donationsReceived;
    private League league;
    private int yonghaScore;
    private int townHallLevel;
    private List<PlayerLabel> labels;
    private int bestTrophies;
    private int warStars;
    private Object troops;
    private Object heroes;
    private Object spells;
    private Object pets;
    private int townHallWeaponLevel;
    private int yonghaScoreRank;
    private int donationRank;
}