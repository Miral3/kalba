import styled from "@emotion/styled";

export const BackgroundDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: ${({ visible }) => (visible ? "block" : "none")};
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${({ zIndex }) => zIndex};
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.bg.modal};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`;
