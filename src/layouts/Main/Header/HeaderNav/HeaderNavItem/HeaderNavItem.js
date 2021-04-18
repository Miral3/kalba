/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Router */
import { NavLink } from 'react-router-dom';

/* Styled */
import styled from 'styled-components';

const ListItem = styled.li`
margin-left: 15px;
  margin-right: 15px;
  cursor: pointer;
  span {
    color: #d6d6d6;
    font-size: 15px;
    font-weight: 700;
  &:hover {
    border-bottom: 4px solid #ffffff;
  }
}
`;

const HeaderNavItem = props => {
  const {
    className,
    label,
    href,
  } = props;

  return (
    <ListItem className={className}>
      <NavLink to={href}>
        <span>{label}</span>
      </NavLink>
    </ListItem>
  );
}

HeaderNavItem.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
}

export default HeaderNavItem;