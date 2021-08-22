import React, { useState } from 'react';

import styled from 'styled-components';

import Sidebar from '../../components/Sidebar';
import { Burger, Menu } from '../../components';

const Container = styled.div`
  padding: 30px;
`;

const Contents = styled.div`
  .title {
    padding-bottom: 15px;
    font-size: 30px;
    font-weight: 700;
    border-bottom: 1px solid #E9EAEE;
  }
`;

const AdminPage = ({ match }) => {
  const [open, setOpen] = useState(false);

  const category = match.params.category || 'quiz';

  const menus = [
    { name: "quiz", text: "퀴즈 조회하기" },
    { name: "standardTable", text: "기준표 설정하기" }
  ];

  return (
    <Container>
      <Contents>
        <div className="title">관리자 페이지</div>
      </Contents>
      {/* <Sidebar menus={menus} type="adminPage" any="quiz" /> */}
      <div>
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </div>
    </Container>
  );
}

export default AdminPage;