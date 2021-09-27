import React, { useState } from 'react';

import styled from 'styled-components';
import { GiHamburgerMenu } from "react-icons/gi";

import Sidebar from '../../components/Sidebar/Sidebar'
import UserList from '../../components/UserList';

const Container = styled.div`
  display: flex;
`;

const Contents = styled.div`
  width: 100%;  
  .contents {
    display: flex;
    flex-direction: column;
    padding-left: 15px;
    position: relative;
    left: 0;
    transition: 850ms;
  }
  .contents.active {
    left: 200px;
    transition: 350ms;
  }
  .icon {  
    border-bottom: 1px solid #E9EAEE;
    padding: 15px 0;
    .burger {
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

const AdminPage = ({ match }) => {
  const [open, setOpen] = useState(false);

  const showSidebar = () => {
    setOpen(!open);
  }

  const category = match.params.category || 'quiz';

  const menus = [
    { name: 'quiz', text: '퀴즈' },
    { name: 'standardTable', text: '기준표' }
  ];

  const selectCategory = (props) => {
    const type = props.category;
    if (type === 'quiz') {
      return <div>
        <UserList type='userInfo' />
      </div>
    } else if (type === 'standardTable') {
      return <div>
        <div className="title">기준표 관리</div>
      </div>
    }
  }

  return (
    <Container>
      <Sidebar open={open} menus={menus} type="adminPage" any="quiz" />
      <Contents>
        <div className={open ? "contents active" : "contents"}>
          <div className="icon">
            <GiHamburgerMenu
              className="burger"
              onClick={() => showSidebar()}
            />
          </div>
          {selectCategory({ category })}
        </div>
      </Contents>
    </Container>
  );
}

export default AdminPage;