import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
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
      const powerRank = [...data.sortedByScoreList].map((val, idx) => ({
        ...val,
        attackPowerRank: idx + 1,
      }));
      const donationRank = [...data.sortedByDonationList].map((val, idx) => ({
        ...val,
        donationRank: idx + 1,
        expectedRole: expectedRole(
          val.role,
          idx,
          val.donations,
          val.tag,
          count
        ),
      }));
      const top10PowerRank = [...powerRank].slice(0, 10);
      const top10DonationRank = [...donationRank].slice(0, 10);

      return {
        powerRank,
        donationRank,
        top10PowerRank,
        top10DonationRank,
      };
    },
    cacheTime: 60000,
    staleTime: 60000,
    ...options,
  });
};

export const useRankUpdate = ({ options }) => {
  const queryClient = useQueryClient();
  return useMutation(
    [queryKeys.RANK_UPDATE],
    () => axios.put(`${url.RANK_UPDATE}`),
    {
      onSuccess() {
        queryClient.invalidateQueries(queryKeys.RANK_DATA);
      },
      onError(err) {
        console.log(err);
      },
      ...options,
    }
  );
};
