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
    padding-right: 16px;
    padding-left: 16px;
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
      color: grey;
    font-size: 12px;
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
          <span>© Kalba. All Rights Reserved.</span>
          <span> Contact: dydtkd113@gmail.com </span>
        </div>
      </div>
    </KalbaFooter>
  );
}

Footer.propTypes = {
  className: PropTypes.string,
}

export default Footer;