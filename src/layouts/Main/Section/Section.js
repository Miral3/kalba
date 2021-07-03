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
  min-height: 93.6vh;
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