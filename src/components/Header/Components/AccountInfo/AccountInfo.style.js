import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import Common from "../../../../styles/common";

export const Container = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  z-index: 2;
  display: ${({ visible }) => (visible ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  height: 285px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 20%);
  background-color: ${Common.colors.gray[0]};
`;

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding-top: 16px;
`;

export const Image = styled.img`
  width: 100px;
`;

export const Link = styled(NavLink)`
  color: ${Common.colors.black[0]};
  font-weight: 600;
`;

export const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 16px 0;
  border-top: 1px solid ${Common.colors.gray[3]};
`;
