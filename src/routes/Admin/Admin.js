import React, { useState } from 'react';

import styled, { createGlobalStyle } from 'styled-components';
import { GiHamburgerMenu } from "react-icons/gi";

import Sidebar from '../../components/Sidebar/Sidebar'
import UserList from '../../components/UserList';
import Categories from '../../components/Categories/Category';
import StandardList from '../../components/Table/StandardList';
import Cover from './Cover'
// import InputForm from '../../components/InputForm';

const Container = styled.div`
  display: flex;
`;
const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;
const Contents = styled.div`
  width: 100%;
  .contents {
    display: flex;
    flex-direction: column;
    /* padding-left: 15px; */
    position: relative;
  }
  .icon {  
    border-bottom: 1px solid #E9EAEE;
    padding: 15px 0;
    .burger {
      margin-left: 15px;
      font-size: 30px;
      cursor: pointer;
    }
  }
  .title {
    color: ${({ theme }) => theme.fontColors.category};
    font-size: 30px;
    font-weight: 700;
  }
`;

const Component = styled.div`
  padding-top: 1.5rem;
`

const Admin = ({ match }) => {
  const [open, setOpen] = useState(false);
  const category = match.params.category || 'management';
  const categorySelect = (window.location.pathname).split('/')[3] || 'heroes';

  const handleSidebar = (open) => {
    setOpen(!open);
  }

  const menus = [
    { name: 'management', text: '관리' },
    { name: `standardTable/${categorySelect}`, text: '기준표' }
  ];

  const selectCategory = (props) => {
    const type = props.category;

    const items = [
      { name: 'heroes', text: '영웅' },
      { name: 'pets', text: '펫' },
      { name: 'troops', text: '유닛' },
      { name: 'spells', text: '마법' },
      { name: 'siegeMachines', text: '시즈머신' },
    ];

    if (type === 'management') {
      return <div>
        <UserList admin={true} type='memberState' />
      </div>
    } else if (type === 'standardTable') {
      return <div>
        {/* <InputForm /> */}
        <Categories items={items} type="admin/standardTable" any="heroes" />
        <StandardList admin={true} category={props.categorySelect} />
      </div>
    }
  }

  return (
    <Container>
      {open ? <GlobalStyle /> : null}
      <Cover open={open} handleSidebar={handleSidebar} />
      <Sidebar open={open} menus={menus} type="admin" any="management" handleSidebar={handleSidebar} />
      <Contents>
        <div className={open ? "contents active" : "contents"}>
          <div className="icon">
            <GiHamburgerMenu
              className="burger"
              onClick={() => handleSidebar()}
            />
          </div>
          <Component>
            {selectCategory({ category, categorySelect })}
          </Component>
        </div>
      </Contents>
    </Container>
  );
}

export default Admin;