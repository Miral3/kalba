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
        origin: data,
      };

      formula.map((val) => type[val.type].push(val));

      return type;
    },
    cacheTime: 60000,
    staleTime: 60000,
    ...options,
  });
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
