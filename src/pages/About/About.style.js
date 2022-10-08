import styled from "@emotion/styled";
import Common from "../../styles/common";
import { Text } from "../../components";

export const Main = styled.main`
  width: 100%;
`;

export const Section = styled.section`
  padding-top: 24px;
  padding-bottom: 80px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 60%;
  margin-bottom: 8px;
  border: 2px solid ${Common.colors.gray[3]};
  border-radius: 50%;

  ${Common.mediaQuery.mobile} {
    margin-bottom: 16px;
  }
`;

export const Name = styled(Text)`
  padding-bottom: 4px;
  font-size: ${Common.fontSize.b[0]};
  font-weight: 600;

  ${Common.mediaQuery.mobile} {
    padding-bottom: 8px;
    font-size: ${Common.fontSize.h[0]};
  }
`;

export const Position = styled(Text)`
  padding-bottom: 4px;
  font-size: ${Common.fontSize.c[1]};
  font-weight: 600;
  color: ${Common.colors.gray[7]};

  ${Common.mediaQuery.mobile} {
    padding-bottom: 8px;
    font-size: ${Common.fontSize.b[1]};
  }
`;

export const Links = styled.div`
  display: flex;
  gap: 8px;
`;

export const Email = styled.span`
  font-variation-settings: "FILL" 1, "wght" 500, "GRAD" 0, "opsz" 48;
  font-size: ${Common.fontSize.h[1]};
  color: ${Common.colors.blue[1]};

  ${Common.mediaQuery.mobile} {
    font-size: ${Common.fontSize.h[0]};
  }
`;

export const Github = styled.img`
  width: 20px;
  height: 20px;

  ${Common.mediaQuery.mobile} {
    width: 24px;
    height: 24px;
  }
`;
