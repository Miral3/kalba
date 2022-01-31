/* React */
import React from 'react';

/* Styled */
import styled from 'styled-components';

const Wrapper = styled.li`
  margin: 5px;
  padding: 5px 7px;
  cursor: pointer;
  &:hover {
    background-color: #E8E8E9;
  }
`;
const Container = styled.div`
`;
const StyledSpan = styled.span`
  font-size: 12px;
`
const Name = styled(StyledSpan)`
  font-weight: 600;
`
const Tag = styled(StyledSpan)`
  color: #5f6368;
`

function SearchView({ name, tag, updateText }) {
  return (
    <Wrapper
      onClick={() => updateText(name, tag)}
    >
      <Container>
        <Name>{name}</Name>
        <Tag> - {tag}</Tag>
      </Container>
    </Wrapper>
  )
}

export default SearchView;