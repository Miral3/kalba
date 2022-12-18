import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import * as url from "../../constants/apiUrl";
import * as queryKeys from "../../constants/queryKeys";

export const useFormulaData = ({ options, type }) => {
  return useQuery(
    [queryKeys.FORMULA_DATA, type],
    () => axios.get(`${url.FORMULA}?type=${type}`),
    {
      select({ data }) {
        return data.formula;
      },
      cacheTime: 60000,
      staleTime: 60000,
      ...options,
    }
  );
};

export const useFormulaDataToObject = () => {
  return useQuery(
    [queryKeys.FORMULA_DATA, "Object"],
    () => axios.get(`${url.FORMULA}`),
    {
      select({ data }) {
        const { formula } = data;
        const type = {
          heroes: [],
          pets: [],
          units: [],
          spells: [],
          siegeMachines: [],
        };

        formula.map((val) => type[val.type].push(val));

        return type;
      },
      cacheTime: 60000,
      staleTime: 60000,
    }
  );
};

export const useFormulaDataUpdate = ({ options }) => {
  const queryClient = useQueryClient();
  return useMutation((newFormula) => axios.put(`${url.FORMULA}`, newFormula), {
    onSuccess() {
      queryClient.invalidateQueries(queryKeys.FORMULA_DATA);
    },
    onError(err) {
      console.log(err);
    },
    ...options,
  });
};

export const useScoreUpdate = ({ options }) => {
  const queryClient = useQueryClient();
  return useMutation(async () => axios.post(`${url.SCORE_UPDATE}`), {
    onSuccess() {
      queryClient.invalidateQueries([queryKeys.RANK_DATA]);
      queryClient.invalidateQueries([queryKeys.PROFILE]);
    },
    onError(err) {
      console.log(err);
    },
    ...options,
  });
};
