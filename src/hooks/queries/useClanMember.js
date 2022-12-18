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
      alert("저장이 완료되었습니다.");
    },
    onError(err) {
      alert("에러가 발생했습니다.");
      console.log(err);
    },
    ...options,
  });
};
