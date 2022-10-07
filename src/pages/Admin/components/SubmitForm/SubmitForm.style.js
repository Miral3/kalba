import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Text } from "../../../../components";
import Common from "../../../../styles/common";

export const Card = styled.div`
  width: calc(100vw - 32px);
  height: calc(100vh - 32px);
  background-color: ${Common.colors.white[0]};
  margin: 10px 8px 16px 8px;

  ${Common.mediaQuery.tabletS} {
    width: 500px;
    height: auto;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.h1`
  font-size: ${Common.fontSize.h[0]};
  font-weight: bold;
  font-family: "supercell+NotoSansKR";
  color: ${Common.colors.red[0]};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 30px;

  ${Common.mediaQuery.tabletS} {
    padding-top: 40px;
  }
`;

export const Header = styled(Text)`
  font-size: ${Common.fontSize.h[1]};
  font-weight: 500;
`;

export const Content = styled.p`
  padding: 16px;
  margin-top: 12px;
  margin-bottom: 16px;
  background-color: ${Common.colors.gray[8]};
  line-height: 20px;

  ${Common.mediaQuery.tabletS} {
    line-height: 24px;
  }
`;

export const Description = styled(Text)`
  font-size: ${Common.fontSize.b[2]};
  font-weight: 500;
  color: ${Common.colors.black[3]};

  ${Common.mediaQuery.tabletS} {
    font-size: ${Common.fontSize.b[1]};
  }
`;

export const Anchor = styled.a`
  padding-left: 8px;
  color: ${Common.colors.blue[0]};
  text-decoration: underline;
`;

const ActiveInputWrapper = css`
  border-bottom: 1px solid ${Common.colors.red[0]};

  & label {
    transform: scale(0.75) translateX(-7px) translateY(-24px);
    color: ${Common.colors.red[0]};
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  margin-top: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid ${Common.colors.gray[3]};

  ${({ isFilled }) => isFilled && ActiveInputWrapper};
  &:focus-within {
    border-bottom: 1px solid ${Common.colors.red[0]};

    & label {
      transform: scale(0.75) translateX(-7px) translateY(-24px);
      color: ${Common.colors.red[0]};
    }
  }
`;

export const InputLabel = styled.label`
  position: absolute;
  left: 0;
  top: 13px;
  transition: all 0.2s;
  transition-timing-function: cubic-bezier(0.25, 0.25, 0.75, 0.75);
  color: ${Common.colors.gray[2]};
  font-weight: 500;
`;
