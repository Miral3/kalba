import styled from "@emotion/styled";
import Common from "../../../../styles/common";
import Button from "../../../Button";

export const Container = styled.div`
  position: relative;
  width: calc(100% - 50px);
  margin: auto;
  ${Common.mediaQuery.tablet} {
    width: 260px;
    margin: 0;
  }
`;
export const Form = styled.form`
  display: flex;
  height: 32px;
  border-radius: 4px;
  overflow: hidden;
  background-color: ${Common.colors.white[0]};
`;

export const InputWrapper = styled.div`
  flex: 1;
`;

export const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  padding-right: 8px;
`;
