/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled, { createGlobalStyle } from 'styled-components';

/* Sub Components */
import Header from './Header';
import Footer from './Footer';
import Section from './Section';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
  }
  body {
      padding: 0;
      margin: 0;
  }
  #root {
    height: 100%;
  }
`;

const Container = styled.div`
  height: auto;
`;

const Main = props => {
  const {
    className,
    children,
  } = props;

  return (
    <Container className={className}>
      <GlobalStyle />
      <Header />
      <Section>
        {children}
      </Section>
      <Footer />
    </Container>
  );
}

Main.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

export default Main;