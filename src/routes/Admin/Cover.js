import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  .cover {
    width:100%;
    z-index: 3;
    position: fixed;
    inset: 0px;
    opacity: ${({ open }) => open ? '1' : '0'};
    visibility: ${({ open }) => open ? 'visible' : 'hidden'};
    transition: opacity 0.3s ease-out 0s, visibility 0.3s ease-out 0s;
    background-color: rgba(0, 0, 0, 0.3);
    @media (min-width: 991px) {
      visibility: hidden;
    }
  }
`;

const Cover = ({ open, handleSidebar }) => {
  return (
    <Container open={open}>
      <div className="cover" onClick={() => handleSidebar(open)}></div>
    </Container>
  );
}

export default Cover;