/* React */
import React, { useEffect, useCallback, useRef } from 'react';

/* Styled */
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';

/* Sub Components */
import SearchView from './SearchView';

const Wrapper = styled.div`
  float: right;
  width: auto;
  margin-left: 10px;
  margin-right: 3rem;
  @media (min-width: 768px) {
    width: auto;
    margin-right: 20px;
  }
`
const Form = styled.form`
  position: relative;
  width: 100%;
  border: 1px solid #fff;
  border-radius: 4px;
  background-color: #fff;
  margin-left: 20px;
  padding-right: 35px;
  margin: 0;
  z-index: 2;
  @media (min-width: 768px) {
    width: 274px;
  }
`;
const Input = styled.input`
  background-color: #fff;
  font-size: 12px;
  border: 0;
  padding: 5px 7px;
  line-height: 20px;
  margin-left: 5px;
  width: 100%;
  &:focus {
    outline: none;
  }
`;
const Button = styled.button`
  position: absolute;
  top: 7px;
  right: 5px;
  border: none;
  font-size: 18px;
  color: #ff4500;
  background-color: #fff;
  outline: none;
  padding: 0;
  cursor: pointer;
`
const ResultsContainer = styled.ul`
  position: absolute;
  top: 28px;
  left: -1px;
  width: calc(100% + 2px);
  background: #fff;
  border-radius: 0 0 4px 4px;
  padding: 0;
  margin: 0;
`
const HeaderInsert = ({ onInsert, keyword, results, updateField }) => {
  let renderResults;
  const arr = results['results'];
  const el = useRef();

  const updateText = (text, tag) => {
    updateField('keyword', text, false);
    updateField('tag', tag);
    updateField('results', []);
  };

  const onSubmit = useCallback(e => {
    if (arr && arr.length > 0) {
      updateText(arr[0].name, arr[0].tag);
    } else {
      onInsert();
      updateText('', '');
    }
    e.preventDefault();
    // eslint-disable-next-line
  }, [keyword, onInsert, updateText]);

  const closeSearchView = e => {
    if (el.current && !el.current.contains(e.target)) {
      updateField('results', []);
    }
  };

  useEffect(() => {
    window.addEventListener('click', closeSearchView);
    return () => {
      window.removeEventListener('click', closeSearchView);
    };
  }, [el]);

  if (arr) {
    renderResults = arr.map(({ name, tag }) => {
      return (
        <SearchView
          updateText={updateText}
          name={name}
          tag={tag}
          key={tag}
        />
      );
    });
  }

  return (
    <Wrapper ref={el} >
      <Form onSubmit={onSubmit}>
        <Input
          placeholder="이름 검색"
          value={keyword || ''}
          onChange={e => updateField('keyword', e.target.value)}
        />
        <Button>
          <MdSearch onClick={onSubmit} />
        </Button>
        <ResultsContainer>
          {renderResults}
        </ResultsContainer>
      </Form>
    </Wrapper>
  );
};

export default HeaderInsert;