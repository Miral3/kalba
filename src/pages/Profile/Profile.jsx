import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProfile } from "../../hooks/queries/useProfile";
import { Skeleton } from "../../components";
import { Info, Rank, Units } from "./components";
import * as S from "./Profile.style";

const Profile = () => {
  const { tag } = useParams();
  const [loading, setLoading] = useState(true);
  const result = useProfile({ tag });
  const isLoading = result.some((result) => result.isLoading);
  const isError = result.some((result) => result.isError);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (isError) return;
    setLoading(true);
    if (!isLoading) {
      const [{ data: clanInfo }, { data: userInfo }] = result;
      setProfile({ ...clanInfo, ...userInfo });
      setLoading(false);
    }
  }, [isLoading]);

  if (isError) {
    return (
      <S.Section>
        <S.StyledText>
          칼 없는 바바리안에 존재하지 않는 사용자 입니다. 닉네임, 태그를 확인 후
          다시 검색해주세요.
        </S.StyledText>
      </S.Section>
    );
  }
  if (loading) {
    return (
      <S.Section>
        <S.Container>
          <Skeleton.Box width="100%" height="193px" />
          <Skeleton.Box width="100%" height="193px" />
          <Skeleton.Box width="100%" height="455px" />
        </S.Container>
      </S.Section>
    );
  }
  return (
    <S.Section>
      <S.Container>
        <Info data={profile} />
        <Rank data={profile} />
        <Units data={profile} />
      </S.Container>
    </S.Section>
  );
};

export default Profile;
