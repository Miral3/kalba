import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  .cover {
    width:100%;
    z-index: 3;
    position: fixed;
    inset: 0px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease-out 0s, visibility 0.3s ease-out 0s;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .cover.active {
    opacity: 1;
    visibility: visible;
  }
`;

const Cover = ({ open, handleSidebar }) => {
  const onClick = () => {
    handleSidebar(open);
  }
  return (
    <Container>
      <div className={open ? "cover active" : "cover"} onClick={() => onClick()}></div>
    </Container>
  );
}

export default Cover;