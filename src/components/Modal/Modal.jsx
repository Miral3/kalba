import React, { useRef } from "react";
import PropTypes from "prop-types";
import * as S from "./Modal.style";

const propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  zIndex: PropTypes.number,
};

const defaultProps = {
  zIndex: 200,
};

const Modal = ({ children, onClose, visible, zIndex, ...style }) => {
  const ref = useRef(null);

  const handleClickDim = (e) => {
    const element = ref.current;
    if (!element) return;

    if (!element.contains(e.target)) {
      onClose();
    }
  };

  return (
    <S.BackgroundDim
      visible={visible}
      zIndex={zIndex}
      onClick={(e) => handleClickDim(e)}
    >
      <S.ModalContainer ref={ref} {...style}>
        {children}
      </S.ModalContainer>
    </S.BackgroundDim>
  );
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
