package kalba.model;

import lombok.Data;

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

    @Override
    public int compareTo(ClanMember o) {
        return Integer.compare(o.getDonations(), this.donations);
    }
}