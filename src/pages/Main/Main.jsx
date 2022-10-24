/* eslint-disable no-unused-vars */
import React, { useState, useLayoutEffect } from "react";
import axios from "axios";
import { expectedRole } from "../../utils/expectedRole";
import { Spinner } from "../../components";
import Top10Table from "./components/Top10Table/Top10Table";
import {
  donationsRankingTableColumns,
  attackPowerRankingTableColumns,
} from "../../assets/data";
import * as S from "./Main.style";

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [top10DonationRank, setTop10DonationRank] = useState([]);
  const [top10PowerRank, setTop10PowerRank] = useState([]);
  const count = {
    cutLine: 13,
    coLeaderCnt: 5,
    adminCnt: 8,
  };

  // const { isLoading, data } = useRankData({});

  // if (!isLoading) {
  //   console.log(data);
  // }
  useLayoutEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.post("/coc/clan/rank", {
          tag: "%232Y2Y9YCUU",
        });
        const donationRankData = [...data]
          .map((val, idx) => ({
            ...val,
            expectedRole: expectedRole(
              val.role,
              idx,
              val.donations,
              val.tag,
              count
            ),
          }))
          .sort((a, b) => a.donationRank - b.donationRank)
          .slice(0, 10);
        const powerRankData = [...data]
          .sort((a, b) => a.yonghaScoreRank - b.yonghaScoreRank)
          .slice(0, 10);

        setTop10DonationRank(donationRankData);
        setTop10PowerRank(powerRankData);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
  }, []);

  return (
    <S.Section>
      <S.Container>
        {loading ? (
          <>
            <Spinner.Box />
            <Spinner.Box />
          </>
        ) : (
          <>
            <Top10Table
              columns={donationsRankingTableColumns}
              data={top10DonationRank}
              title="지원 TOP 10"
              timer="승강전: 22일 5시간 후"
            />
            <Top10Table
              columns={attackPowerRankingTableColumns}
              data={top10PowerRank}
              title="공격력 TOP 10"
              timer="리그전: 22일 5시간 후"
            />
          </>
        )}
      </S.Container>
    </S.Section>
  );
};

export default Main;
