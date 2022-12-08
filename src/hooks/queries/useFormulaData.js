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
