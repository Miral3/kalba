import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Text } from "../../../../components";
import Common from "../../../../styles/common";

export const Card = styled.div`
  width: calc(100vw - 32px);
  height: calc(100vh - 32px);
  background-color: ${({ theme }) => theme.bg.modal};
  padding: 10px 8px 16px 8px;

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
  color: ${({ theme }) => theme.text.logo};
`;

export const Close = styled.span`
  font-size: ${Common.fontSize.h[0]};
  color: ${({ theme }) => theme.text.text};
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
  background-color: ${({ theme }) => theme.bg.description};
  line-height: 20px;

  ${Common.mediaQuery.tabletS} {
    line-height: 24px;
  }
`;

export const Description = styled(Text)`
  font-size: ${Common.fontSize.b[2]};
  font-weight: 500;
  color: ${({ theme }) => theme.text.description};

  ${Common.mediaQuery.tabletS} {
    font-size: ${Common.fontSize.b[1]};
  }
`;

export const Strong = styled.strong`
  font-weight: bold;
  color: ${({ theme }) => theme.text.text};
`;

export const Reference = styled.span`
  display: flex;
  gap: 5px;
  align-items: center;
  font-size: ${Common.fontSize.b[2]};
  font-weight: 600;
  color: ${Common.colors.white[0]};

  ${Common.mediaQuery.tabletS} {
    font-size: ${Common.fontSize.b[1]};
  }
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
