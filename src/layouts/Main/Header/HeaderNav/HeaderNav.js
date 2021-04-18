/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Sub Components */
import HeaderNavItem from './HeaderNavItem';

const List = styled.ul`
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
`;

const HeaderNav = props => {
  const {
    className,
    items,
  } = props;

  return (
    <List className={className}>
      {
        items && items.map((opt, idx) => (
          <HeaderNavItem key={idx} {...opt} />
        ))
      }
    </List>
  );
}

HeaderNav.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
}

export default HeaderNav;