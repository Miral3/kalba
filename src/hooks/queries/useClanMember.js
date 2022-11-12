import axios from "axios";
import { useQuery } from "react-query";
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
