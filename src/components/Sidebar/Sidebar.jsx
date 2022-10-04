import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "../index";
import * as S from "./Sidebar.style";

const propTypes = {
  items: PropTypes.instanceOf(Array).isRequired,
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  zIndex: PropTypes.number,
};

const defaultProps = {
  zIndex: 200,
};

const Sidebar = ({ items, onClose, visible, zIndex, ...style }) => {
  const location = useLocation();
  const [active, setActive] = useState(0);
  const ref = useRef(null);

  const handleClickDim = (e) => {
    const element = ref.current;
    if (!element) return;

    if (!element.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    const { pathname } = location;
    const visitedIdx = items.findIndex((item) => pathname === item.url);
    setActive(visitedIdx);
  }, [location]);

  return (
    <S.BackgroundDim
      visible={visible}
      zIndex={zIndex}
      onClick={(e) => handleClickDim(e)}
    >
      <S.Container ref={ref} {...style}>
        <S.Header>
          <Button
            onClick={() => onClose()}
            hover
            style={{ marginRight: "24px" }}
          >
            <S.Menu className="material-symbols-outlined">menu</S.Menu>
          </Button>
          <S.Logo>Kalba</S.Logo>
        </S.Header>
        <S.Nav>
          {items.map((item, idx) => (
            <S.Link
              key={item.id}
              to={items[idx].url}
              value={item.value}
              active={active === idx}
            >
              <S.StyledIcon className="material-symbols-outlined">
                {item.icon}
              </S.StyledIcon>
              <S.Name>{item.name}</S.Name>
            </S.Link>
          ))}
        </S.Nav>
      </S.Container>
    </S.BackgroundDim>
  );
};

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default Sidebar;
