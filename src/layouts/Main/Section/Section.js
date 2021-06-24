/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.bgColors.section};
`;

const Wrapper = styled.div`
  height: 100%;
  min-height: 70vh;
  @media (max-width: 768px) {
    min-height: 75.3vh;
  }
`;

const Section = props => {
  const {
    children
  } = props;

  return (
    <Container>
      <Wrapper>
        {children}
      </Wrapper>
    </Container >
  );
}

Section.propTypes = {
  children: PropTypes.node,
}

export default Section;