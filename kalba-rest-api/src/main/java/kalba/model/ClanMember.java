package kalba.model;

import lombok.Data;

import java.util.List;

@Data
public class ClanMember implements Comparable<ClanMember>{
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

    @Override
    public int compareTo(ClanMember o) {
        return Integer.compare(o.getDonations(), this.donations);
    }
}