import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Aligner = styled.div`
    margin-top: 1rem;
    text-align: right;
`;

const StyledLink = styled(Link)`
    color: #868e96;
    &:hover {
        color: #495057;
    }
`

const RightAlignedLink = ({ to, children }) => (
  <Aligner>
    <StyledLink to={to}>{children}</StyledLink>
  </Aligner>
);

export default RightAlignedLink;