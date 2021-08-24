import React, { useState } from 'react';

import styled from 'styled-components';
import { GiHamburgerMenu } from "react-icons/gi";

import Sidebar from '../../components/Sidebar/Sidebar'

const Container = styled.div`
  display: flex;
`;

const Contents = styled.div`
  padding-left: 15px;
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

  const category = match.params.category || 'quiz';

  const menus = [
    { name: 'quiz', text: '퀴즈' },
    { name: 'standardTable', text: '기준표' }
  ];

  const func = (props) => {
    const type = props.category;
    if (type === 'quiz') {
      return <div>
        <div className="title">퀴즈 조회</div>
      </div>
    } else if (type === 'standardTable') {
      return <div>
        <div className="title">기준표 관리</div>
      </div>
    }
  }

  const onClick = () => {
    setOpen(!open);
  }

  return (
    <Container>
      <Sidebar open={open} menus={menus} type="adminPage" any="quiz" />
      <Contents>
        <div className="icon">
          <GiHamburgerMenu
            className="burger"
            onClick={() => onClick()}
          />
        </div>
        {func({ category })}
      </Contents>
    </Container>
  );
}

export default AdminPage;