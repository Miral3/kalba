import axios from "axios";
import { useQuery, useQueries } from "react-query";
import * as url from "../../constants/apiUrl";
import * as queryKeys from "../../constants/queryKeys";

export const useProfile = ({ tag }) => {
  return useQueries([
    {
      queryKey: [queryKeys.CLAN_INFO],
      queryFn: () => axios.get(`${url.CLAN_INFO}`),
      select({ data }) {
        return {
          clanName: data.name,
          badgeUrls: data.badgeUrls,
        };
      },
    },
    {
      queryKey: [queryKeys.PROFILE, tag],
      queryFn: () => axios.get(`${url.PROFILE}?tag=%23${tag}`),
      select({ data }) {
        return data;
      },
      retry: false,
      refetchOnWindowFocus: false,
      cacheTime: 0,
      staleTime: 0,
    },
  ]);
};

export const useMiniProfile = ({ token }) => {
  return useQuery(
    [queryKeys.CLAN_INFO, token],
    () => axios.get(`${url.MINI_PROFILE}?token=${token}`),
    {
      select({ data }) {
        return data;
      },
      retry: false,
      cacheTime: 60000,
      staleTime: 60000,
    }
  );
};
