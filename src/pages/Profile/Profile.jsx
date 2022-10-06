import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Info, Rank, Units } from "./components";
import { profile } from "../../assets/dummyData";
import * as S from "./Profile.style";

const Profile = () => {
  const { tag } = useParams();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    console.log(tag);
    setLoading(true);
    setUserInfo(profile);
    setLoading(false);
  }, []);

  if (loading) return;
  return (
    <S.Main>
      <S.Section>
        <S.Container>
          <Info data={userInfo} />
          <Rank data={userInfo} />
          <Units data={userInfo} />
        </S.Container>
      </S.Section>
    </S.Main>
  );
};

export default Profile;
