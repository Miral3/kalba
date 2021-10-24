package kalba.repository;

import kalba.models.coc.clan.ClanInfo;
import kalba.models.coc.clan.Statistic;
import kalba.models.coc.yongha.Formula;
import kalba.models.coc.yongha.FormulaUpdateInfo;
import kalba.util.MemberDataManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.util.*;

@RequiredArgsConstructor
public class StatisticMongoRepository {
    private final MongoTemplate mongoTemplate;

    public Optional<Statistic> findByName(String name) {
        return Optional.ofNullable(mongoTemplate.findOne(Query.query(Criteria.where("name").is(name)), Statistic.class, "statistic"));
    }

    public Optional<Statistic> findByTag(String tag) {
        return Optional.ofNullable(mongoTemplate.findOne(Query.query(Criteria.where("tag").is(tag)), Statistic.class, "statistic"));
    }

    public ClanInfo findClanInfoByClanId(String id) {
        return mongoTemplate.findOne(Query.query(Criteria.where("tag").is(MemberDataManager.decodeUTF8(id))), ClanInfo.class, "clan");
    }

    public List<Statistic> findAllClanMemberStatistic(String clanTag) {
        return mongoTemplate.find(new Query(Criteria.where("clanTag").is(clanTag)), Statistic.class, "statistic");
    }

    public List<Statistic> findAll() {
        return mongoTemplate.findAll(Statistic.class, "statistic");
    }

    public void updateClanMemberStatistic(List<Statistic> list, String clanTag) {
        Map<String, Boolean> memberUpdateState = new HashMap<>();
        for (Statistic statistic : findAllClanMemberStatistic(clanTag)) {
            memberUpdateState.put(statistic.getTag(), false);
        }
        for (Statistic statistic : list) {
            memberUpdateState.put(statistic.getTag(), true);
            mongoTemplate.upsert(new Query(Criteria.where("tag").is(statistic.getTag())), memberStatisticUpdate(statistic, clanTag), "statistic");
        }
        for (String member : memberUpdateState.keySet()) {
            if (!memberUpdateState.get(member)) {
                mongoTemplate.remove(new Query(Criteria.where("tag").is(member)), "statistic");
            }
        }
    }

    public void updateClanInfo(Map<Object, Object> clanInfo) {
        mongoTemplate.upsert(new Query(Criteria.where("tag").is(clanInfo.get("tag"))), clanInfoUpdate(clanInfo), "clan");
    }

    public Optional<Formula> findYonghaScoreFormula() {
        return mongoTemplate.findAll(Formula.class, "formula").stream().findAny();
    }

    public boolean updateYonghaScoreFormula(FormulaUpdateInfo formulaUpdateInfo) {
        try {
            mongoTemplate.upsert(new Query(), new Update().set(formulaUpdateInfo.getName(), formulaUpdateInfo.getFormulaDataObject()), "formula");
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    private Update memberStatisticUpdate(Statistic statistic, String clanTag) {
        Update update = new Update();
        update.set("name", statistic.getName())
                .set("role", statistic.getRole())
                .set("expLevel", statistic.getExpLevel())
                .set("trophies", statistic.getTrophies())
                .set("versusTrophies", statistic.getVersusTrophies())
                .set("clanRank", statistic.getClanRank())
                .set("previousClanRank", statistic.getPreviousClanRank())
                .set("donations", statistic.getDonations())
                .set("donationsReceived", statistic.getDonationsReceived())
                .set("league", statistic.getLeague())
                .set("yonghaScore", statistic.getYonghaScore())
                .set("townHallLevel", statistic.getTownHallLevel())
                .set("labels", statistic.getLabels())
                .set("bestTrophies", statistic.getBestTrophies())
                .set("warStars", statistic.getWarStars())
                .set("troops", statistic.getTroops())
                .set("heroes", statistic.getHeroes())
                .set("spells", statistic.getSpells())
                .set("pets", statistic.getPets())
                .set("townHallWeaponLevel", statistic.getTownHallWeaponLevel())
                .set("clanTag", clanTag)
                .set("yonghaScoreRank", statistic.getYonghaScoreRank())
                .set("donationRank", statistic.getDonationRank());
        return update;
    }

    private Update clanInfoUpdate(Map<Object, Object> clanInfo) {
        Update update = new Update();
        String[] clanInfoFields = {"name", "type", "description", "location", "badgeUrls", "clanLevel"
                , "clanPoints", "clanVersusPoints", "requiredTrophies", "warFrequency", "warWinStreak"
                , "warWins", "isWarLogPublic", "warLeague", "members", "memberList", "labels", "chatLanguage"
                , "requiredVersusTrophies", "requiredTownhallLevel"};
        for (String field : clanInfoFields) {
            update.set(field, clanInfo.get(field));
        }
        return update;
    }
}