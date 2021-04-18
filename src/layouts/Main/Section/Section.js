/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: #F5F5F5;
`;

const Wrapper = styled.div`
  height: 100%;
  min-height: 660px;
`;

const Section = props => {
  const {
    className,
    children,
  } = props;

  return (
    <Container className={className}>
      <Wrapper>
        {children}
      </Wrapper>
    </Container>
  );
}

Section.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

export default Section;