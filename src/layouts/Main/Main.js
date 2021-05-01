/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled, { createGlobalStyle } from 'styled-components';

/* Sub Components */
import Header from './Header';
import ThemeToggle from '../../Theme/ThemeToggle';
import Section from './Section';
import Footer from './Footer';

import { useTheme } from '../../context/themeProvider';


const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
  }
  body {
      padding: 0;
      margin: 0;
  }
  a {
    text-decoration: none !important;
    &:link {
      color: black;
    text-decoration: none;
    }
    &:visited {
      color: black;
    text-decoration: none;
    }
  }
  #root {
    height: 100%;
  }
`;

const Container = styled.div`
  height: auto;
`;

const Main = props => {
  const [ThemeMode, toggleTheme] = useTheme();
  const {
    className,
    children,
  } = props;

  return (
    <Container className={className}>
      <GlobalStyle />
      <Header />
      <ThemeToggle toggle={toggleTheme} mode={ThemeMode}>
        DarkMode
      </ThemeToggle>
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