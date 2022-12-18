import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import { updateLoading } from "../../recoil/score";
import { expectedRole } from "../../utils/expectedRole";
import * as url from "../../constants/apiUrl";
import * as queryKeys from "../../constants/queryKeys";

export const useRankData = ({ options }) => {
  const count = {
    cutLine: 13,
    coLeaderCnt: 5,
    adminCnt: 8,
  };

  return useQuery([queryKeys.RANK_DATA], () => axios.get(`${url.RANK}`), {
    select({ data }) {
      const type = {
        donations: [],
        score: [],
        top10: {
          donations: [],
          score: [],
        },
      };
      const donationRank = [...data.sortedByDonationList].map((val, idx) => ({
        ...val,
        expectedRole: expectedRole(
          val.role,
          idx,
          val.donations,
          val.tag,
          count
        ),
      }));
      const scoreRank = [...data.sortedByScoreList];
      const top10DonationRank = [...donationRank].slice(0, 10);
      const top10ScoreRank = [...scoreRank].slice(0, 10);

      type.donations = donationRank;
      type.score = scoreRank;
      type.top10.donations = top10DonationRank;
      type.top10.score = top10ScoreRank;

      return type;
    },
    cacheTime: 60000,
    staleTime: 60000,
    ...options,
  });
};

export const useRankUpdate = ({ options }) => {
  const queryClient = useQueryClient();
  const setUpdateLoading = useSetRecoilState(updateLoading);
  return useMutation(async () => axios.put(`${url.RANK_UPDATE}`), {
    onMutate() {
      setUpdateLoading(true);
    },
    onSuccess() {
      setUpdateLoading(false);
      queryClient.invalidateQueries([queryKeys.RANK_DATA]);
      queryClient.invalidateQueries([queryKeys.PROFILE]);
    },
    onError(err) {
      alert("갱신 요청이 처리 중입니다.");
      console.log(err);
    },
    ...options,
  });
};
