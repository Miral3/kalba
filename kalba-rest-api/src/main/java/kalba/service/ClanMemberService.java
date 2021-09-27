package kalba.service;

import kalba.models.coc.clan.ClanInfo;
import kalba.models.coc.clan.Statistic;
import kalba.models.coc.yongha.Formula;
import kalba.repository.StatisticMongoRepository;
import kalba.util.MemberDataManager;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
public class ClanMemberService {
    private final StatisticMongoRepository statisticMongoRepository;
    private final MemberDataManager memberDataManager;

    public Statistic findByName(String name) {
        return statisticMongoRepository.findByName(name);
    }

    public Statistic findByTag(String tag) {
        return statisticMongoRepository.findByTag(tag);
    }

    public List<Statistic> findClanMemberStatistic(String clanTag) {
        List<Statistic> statisticList = statisticMongoRepository.findAllClanMemberStatistic(clanTag);
        return statisticList;
//        List<Ranking> ranking = new LinkedList<>();
//        for (Statistic statistic : statisticList) {
//            ranking.add(Ranking.builder()
//                    .league(statistic.getLeague())
//                    .name(statistic.getName())
//                    .role(statistic.getRole())
//                    .trophies(statistic.getTrophies())
//                    .townHallLevel(statistic.getTownHallLevel())
//                    .donations(statistic.getDonations())
//                    .yonghaScore(statistic.getYonghaScore())
//                    .build());
//        }
//        return ranking;
    }

    public ClanInfo findClanInfo(String clanCode) {
        return statisticMongoRepository.findClanInfoByClanId(clanCode);
    }

    public Optional<Formula> findYonghaScoreFormula() {
        return statisticMongoRepository.findYonghaScoreFormula();
    }

    public boolean forceUpdate(String clanTag) {
        return memberDataManager.updateClanInfo(clanTag);
    }
}