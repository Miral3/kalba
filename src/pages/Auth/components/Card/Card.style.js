import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Text } from "../../../../components";
import Common from "../../../../styles/common";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${Common.colors.white[0]};
  padding: 0 24px;

  ${Common.mediaQuery.tablet} {
    width: 500px;
    height: auto;
    padding: 24px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
  }
`;

export const Logo = styled.h1`
  padding: 32px 0;
  text-align: center;
  font-size: ${Common.fontSize.h[0]};
  font-weight: bold;
  font-family: "supercell+NotoSansKR";
  color: ${Common.colors.red[0]};

  ${Common.mediaQuery.tablet} {
    font-size: ${Common.fontSize.l[2]};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled(Text)`
  padding-bottom: 16px;
  font-size: ${Common.fontSize.h[1]};
  font-weight: 500;
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
  margin: 8px 0;
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
`;

export const Link = styled(Text)`
  margin-top: 16px;
  text-align: right;
  font-size: ${Common.fontSize.b[1]};
  color: ${Common.colors.blue[0]};
  text-decoration: underline;
`;
