import React, { useEffect, useMemo } from "react";
import ReactDom from "react-dom";
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

  const el = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  });

  return ReactDom.createPortal(
    <S.BackgroundDim visible={visible}>
      <S.ModalContainer ref={ref} {...style}>
        {children}
      </S.ModalContainer>
    </S.BackgroundDim>,
    el
  );
};

Modal.propTypes = propTypes;

export default Modal;
