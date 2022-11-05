import axios from "axios";
import { useQuery } from "react-query";
import * as url from "../../constants/apiUrl";
import * as queryKeys from "../../constants/queryKeys";

export const useSearchClanMember = ({ options, keyword, filterOption }) => {
  return useQuery(
    [queryKeys.CLAN_MEMBER, keyword],
    () => axios.get(`${url.CLAN_INFO}`),
    {
      select({ data }) {
        const { memberList } = data;
        const filteredData = memberList.filter((item) => {
          return filterOption.some(
            (key) =>
              item[key]?.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
          );
        });

        return filteredData;
      },
      enabled: !!keyword,
      refetchOnWindowFocus: false,
      keepPreviousData: !!keyword,
      ...options,
    }
  );
};
