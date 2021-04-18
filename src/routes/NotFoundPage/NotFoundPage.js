import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Container = styled.div`
`;

const NotFoundPage = props => {
  const {
    className,
  } = props;

  return (
    <Container className={className}>
      올바르지 않은 주소
    </Container>
  );
}

NotFoundPage.propTypes = {
  className: PropTypes.string,
}

export default NotFoundPage;