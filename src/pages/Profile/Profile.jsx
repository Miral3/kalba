import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Info, Rank, Units } from "./components";
import { profile } from "../../assets/dummyData";
import * as S from "./Profile.style";

const Profile = () => {
  const { tag } = useParams();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  /**
   * @Todo 칼 없는 바바리안 클랜에 존재하는 유저인지 체크
   */
  // const isExist = false;
  // if (!isExist) {
  //   return (
  //     <S.Main>
  //       <S.Section>
  //         <S.StyledText>
  //           칼 없는 바바리안에 존재하지 않는 사용자 입니다. 닉네임, 태그를 확인
  //           후 다시 검색해주세요.
  //         </S.StyledText>
  //       </S.Section>
  //     </S.Main>
  //   );
  // }

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
