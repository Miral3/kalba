import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { jwtToken, logoutProcess } from "../../../../recoil/authentication";
import { useMiniProfile } from "../../../../hooks/queries/useProfile";
import { Text, Button, Icon } from "../../../index";
import { translateRole } from "../../../../utils/translate";
import { copyText } from "../../../../utils/copy";
import Common from "../../../../styles/common";
import * as S from "./AccountInfo.style";

const propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};

const AccountInfo = forwardRef(({ visible, setVisible }, ref) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const token = useRecoilValue(jwtToken);
  const { isLoading, data } = useMiniProfile({ token });
  const setLogout = useSetRecoilState(logoutProcess);
  const handleClickLogoutButton = () => {
    setLogout();
    setVisible(false);
    if (pathname.includes("admin")) {
      navigate("/");
    }
  };

  return (
    <S.Container visible={visible} ref={ref}>
      {!isLoading && (
        <S.UserInfoContainer>
          <NavLink to={`/profile/${data.tag.substr(1)}`}>
            <S.Image src={data.badge} alt="leagueBadge" />
          </NavLink>
          <S.Link to={`/profile/${data.tag.substr(1)}`}>{data.name}</S.Link>
          <Text>
            {translateRole(data.role)} | 공 {data.score}
          </Text>
          <S.TagContainer>
            <Text>{data.tag}</Text>
            <Button
              onClick={() => copyText(data.tag)}
              hover
              style={{ marginBottom: "3px" }}
            >
              <Icon size={Common.fontSize.h[2]}>file_copy</Icon>
            </Button>
          </S.TagContainer>
        </S.UserInfoContainer>
      )}

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
