import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Common from "../../styles/common";

const Logo = css`
  font-size: ${Common.fontSize.l[1]};
  font-weight: bold;
  font-family: "supercell+NotoSansKR";
  color: ${Common.colors.white[0]};
`;

export const Text = styled.span`
  font-size: ${({ size }) => size};
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => color};

  ${({ type }) => {
    switch (type) {
      case "logo":
        return Logo;
      default:
        break;
    }
  }}
`;
