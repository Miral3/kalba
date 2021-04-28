import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

const KalbaFooter = styled.div`
  height: 51px;
  padding: 16px;
  background-color: #F0F0F0;
  .container {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    @media (min-width: 768px) {
      max-width: 720px;
    }
    @media (min-width: 576px) {
      max-width: 540px;
    }
  }

  .kalba-footer__logo {
    font-size: 19px;
    font-weight: 700;
  }

  .kalba-footer__contact {
    margin-bottom: .5rem!important;
    span {
      margin-right: 5px;
      color: grey;
      font-size: 12px;
    }
    .contact {
        font-size:13px;
        color: #2980b9;
        font-weight: 600;
      }
  }
`;

const Footer = props => {
  const {
    className,
  } = props;

  return (
    <KalbaFooter className={className}>
      <div className="kalba-footer__content container">
        <div>
          <a href="/">
            <span className="kalba-footer__logo">
              Kalba
              </span>
          </a>
        </div>
        <div className="kalba-footer__contact">
          <a href="/about">
            <span className="contact">[About us]</span>
          </a>
          <span className="right">© Kalba. All Rights Reserved.</span>
        </div>
      </div>
    </KalbaFooter>
  );
}

Footer.propTypes = {
  className: PropTypes.string,
}

export default Footer;