import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as url from "../../constants/apiUrl";
import * as queryKeys from "../../constants/queryKeys";

export const useClanMember = ({ options }) => {
  return useQuery(
    [queryKeys.CLAN_MEMBER],
    () => axios.get(`${url.CLAN_MEMBER}`),
    {
      select({ data }) {
        return data;
      },
      ...options,
    }
  );
};

export const useClanMemberUpdate = ({ options }) => {
  const queryClient = useQueryClient();
  return useMutation((newState) => axios.post(`${url.CLAN_MEMBER}`, newState), {
    onSuccess() {
      queryClient.invalidateQueries(queryKeys.CLAN_MEMBER);
    },
    onError(err) {
      console.log(err);
    },
    ...options,
  });
};
