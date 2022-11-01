import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import * as url from "../../constants/apiUrl";
import * as queryKeys from "../../constants/queryKeys";

export const useFormulaData = ({ options }) => {
  return useQuery([queryKeys.FORMULA_DATA], () => axios.get(`${url.FORMULA}`), {
    select({ data }) {
      const { formula } = data;
      const type = {
        units: [],
        siegeMachines: [],
        spells: [],
        heroes: [],
        pets: [],
      };

      formula.map((val) => type[val.type].push(val));

      return type;
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
