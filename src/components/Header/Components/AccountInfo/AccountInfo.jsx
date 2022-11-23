import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { logoutProcess } from "../../../../recoil/authentication";
import { Text, Button, Icon } from "../../../index";
import { copyText } from "../../../../utils/copy";
import Common from "../../../../styles/common";
import * as S from "./AccountInfo.style";

const propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};

const AccountInfo = forwardRef(({ visible, setVisible }, ref) => {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  /**
   * @Todo 유저 태그로 갖고오기
   */
  const leagueBadge =
    "https://api-assets.clashofclans.com/leagues/288/4wtS1stWZQ-1VJ5HaCuDPfdhTWjeZs_jPar_YPzK6Lg.png";
  const BASE_BADGE =
    "https://api-assets.clashofclans.com/leagues/72/e--YMyIexEQQhE4imLoJcwhYn6Uy8KqlgyY3_kFV6t4.png";
  const tag = "#LJLLLQLQR".substr(1);
  const nickname = "Miral";
  const role = "공대";
  const yongaScore = 1275;
  const setLogout = useSetRecoilState(logoutProcess);
  /**
   * @Todo recoil의 로그인 상태 변경 추가
   */
  const handleClickLogoutButton = () => {
    setLogout();
    setVisible(false);
    if (pathname.includes("admin")) {
      navigate("/");
    }
  };

  return (
    <S.Container visible={visible} ref={ref}>
      <S.UserInfoContainer>
        <NavLink to={`/profile/${tag}`}>
          <S.Image src={leagueBadge || BASE_BADGE} alt="leagueBadge" />
        </NavLink>
        <S.Link to={`/profile/${tag}`}>{nickname}</S.Link>
        <Text>
          {role} | 공 {yongaScore}
        </Text>
        <S.TagContainer>
          <Text>{tag}</Text>
          <Button
            onClick={() => copyText(tag)}
            hover
            style={{ marginBottom: "3px" }}
          >
            <Icon size={Common.fontSize.h[2]}>file_copy</Icon>
          </Button>
        </S.TagContainer>
      </S.UserInfoContainer>
      <S.ButtonContainer>
        <Button version="logout" onClick={handleClickLogoutButton}>
          로그아웃
        </Button>
      </S.ButtonContainer>
    </S.Container>
  );
});

AccountInfo.propTypes = propTypes;

export default AccountInfo;
