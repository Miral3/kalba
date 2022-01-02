package kalba.service;

import kalba.models.account.AccountQuizAndState;
import kalba.models.coc.clan.ClanInfo;
import kalba.models.coc.clan.Ranking;
import kalba.models.coc.clan.Statistic;
import kalba.models.coc.yongha.*;
import kalba.repository.AccountRepository;
import kalba.repository.StatisticMongoRepository;
import kalba.util.MemberDataManager;
import lombok.RequiredArgsConstructor;

import java.util.*;

@RequiredArgsConstructor
public class ClanMemberService {
    private final StatisticMongoRepository statisticMongoRepository;
    private final MemberDataManager memberDataManager;
    private final AccountRepository accountRepository;
    private static final String[] FORMULA_CLASS_NAME = {"units", "siegeMachines", "spells", "heroes", "pets"};

    public Optional<Statistic> findByName(String name) {
        return statisticMongoRepository.findByName(name);
    }

    public Optional<Statistic> findByTag(String tag) {
        return statisticMongoRepository.findByTag(tag);
    }

    public List<Ranking> findClanMemberStatistic(String clanTag) {
        List<Statistic> statisticList = statisticMongoRepository.findAllClanMemberStatistic(clanTag);
        List<Ranking> ranking = new LinkedList<>();
        for (Statistic statistic : statisticList) {
            ranking.add(Ranking.builder()
                    .league(statistic.getLeague())
                    .name(statistic.getName())
                    .tag(statistic.getTag())
                    .role(statistic.getRole())
                    .trophies(statistic.getTrophies())
                    .townHallLevel(statistic.getTownHallLevel())
                    .donations(statistic.getDonations())
                    .yonghaScore(statistic.getYonghaScore())
                    .yonghaScoreRank(statistic.getYonghaScoreRank())
                    .donationRank(statistic.getDonationRank())
                    .build());
        }
        return ranking;
    }

    public ClanInfo findClanInfo(String clanCode) {
        return statisticMongoRepository.findClanInfoByClanId(clanCode);
    }

    public Optional<Formula> findYonghaScoreFormula() {
        return statisticMongoRepository.findYonghaScoreFormula().map(this::formulaForMongoDBToFormula);
    }

    public boolean forceUpdate(String clanTag) {
        return memberDataManager.updateClanInfo(clanTag);
    }

    public List<AccountQuizAndState> getMemberStateList(String clanTag) {
        List<AccountQuizAndState> quizAndStateList = accountRepository.findAllAccountQuizAndState();
        Map<String, Integer> quizAndStateIdxMap = new HashMap<>();
        int idx = 0;
        for (AccountQuizAndState account : quizAndStateList) {
            quizAndStateIdxMap.put(account.getTag(), idx++);
        }
        List<Statistic> statisticList = statisticMongoRepository.findAllClanMemberStatistic(clanTag);
        List<AccountQuizAndState> retList = new ArrayList<>(statisticList.size());
        for (Statistic statistic : statisticList) {
            if (quizAndStateIdxMap.containsKey(statistic.getTag())) {
                retList.add(quizAndStateList.get(quizAndStateIdxMap.get(statistic.getTag())));
            } else {
                retList.add(AccountQuizAndState.builder()
                        .nickname(statistic.getName())
                        .tag(statistic.getTag())
                        .member(false)
                        .build());
            }
        }
        retList.sort(Comparator.comparing(AccountQuizAndState::getNickname));
        return retList;
    }

    public boolean updateMemberState(List<AccountQuizAndState> list) {
        return accountRepository.updateMemberAccountQuizAndStateList(list);
    }

    public boolean updateYonghaScoreFormula(Formula formulaUpdateInfo) {
        boolean changed = false;
        for (String name : FORMULA_CLASS_NAME) {
            if (formulaUpdateInfo.isEmpty(name)) {
                statisticMongoRepository.updateYonghaScoreFormula(name, formulaDataListToMap(formulaUpdateInfo.classNameToFormula(name)));
                changed = true;
            }
        }
        return changed;
    }

    private Formula formulaForMongoDBToFormula(FormulaForMongoDB formula) {
        return Formula.builder()
                .heroes(formulaDataMapToList(formula.getHeroes()))
                .pets(formulaDataMapToList(formula.getPets()))
                .units(formulaDataMapToList(formula.getUnits()))
                .spells(formulaDataMapToList(formula.getSpells()))
                .siegeMachines(formulaDataMapToList(formula.getSiegeMachines()))
                .build();
    }

    private List<FormulaData> formulaDataMapToList(LinkedHashMap<String, FormulaDataForMongoDB> map) {
        List<FormulaData> list = new LinkedList<>();
        for (String english : map.keySet()) {
            FormulaDataForMongoDB data = map.get(english);
            list.add(FormulaData.builder()
                    .english(english)
                    .index(data.getIndex())
                    .korean(data.getKorean())
                    .value(data.getValue())
                    .maxScore(data.getMaxScore())
                    .maxLevel(data.getMaxLevel())
                    .build());
        }
        return list;
    }

    private Map<String, FormulaDataForMongoDB> formulaDataListToMap(List<FormulaData> list) {
        LinkedHashMap<String, FormulaDataForMongoDB> map = new LinkedHashMap<>();
        for (FormulaData data : list) {
            map.put(data.getEnglish(),
                    FormulaDataForMongoDB.builder()
                            .index(data.getIndex())
                            .korean(data.getKorean())
                            .value(data.getValue())
                            .maxScore(data.getMaxScore())
                            .maxLevel(data.getMaxLevel()).build()
            );
        }
        return map;
    }
}