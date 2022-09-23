import React from "react";
import PropTypes from "prop-types";
import useClickAway from "../../hooks/useClickAway";
import * as S from "./Modal.style";

const propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

const Modal = ({ children, onClose, visible, ...style }) => {
  const ref = useClickAway(() => {
    onClose();
  });

  return (
    <S.BackgroundDim visible={visible}>
      <S.ModalContainer ref={ref} {...style}>
        {children}
      </S.ModalContainer>
    </S.BackgroundDim>
  );
};

Modal.propTypes = propTypes;

export default Modal;
