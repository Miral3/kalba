/* React */
import React from 'react';

/* Styled */
import styled from 'styled-components';

/* Sub Components */
import Categories from '../../components/Categories/Category';
import UserList from '../../components/UserList';
import html2canvas from 'html2canvas';

const Container = styled.div`
  padding-top: 1.5rem;
`
const Button = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 1.5rem;

  .downloadBtn {
    background-color: #1aab8a;
    /* #e74c3d */
    color: #fff;
    border: none;
    cursor: pointer;
    position: relative;
    width: 200px;
    height: 60px;
    font-size: 1.2em;
    transition:8 00ms ease all;
    outline: none;
    &:hover  {
      background: #fff;
      color: #1aab8a;
    }
    &:before,&:after {
      content:'';
      position: absolute;
      top: 0;
      right: 0;
      height: 2px;
      width: 0;
      background: #1aab8a;
      transition: 400ms ease all;
    }
    &:after{
      right: inherit;
      top: inherit;
      left: 0;
      bottom: 0;
    }
    &:hover:before,&:hover:after{
      width: 100%;
      transition: 800ms ease all;
    }
  }
`
const items = [
  { name: 'score', text: '공격력' },
  { name: 'donations', text: '지원량' }
];

const printToPdf = () => {
  html2canvas(document.getElementById("print_to_pdf")).then(canvas => {
    var data = canvas.toDataURL();
    downloadURI(data, "ranking_list.png")
  });
};

const downloadURI = (uri, name) => {
  const link = document.createElement("a")
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
}

const LeaderBoards = ({ match }) => {
  const category = match.params.category || 'score';

  return (
    <Container>
      <Categories items={items} type="leaderboards" any="score" />
      <div id="print_to_pdf">
        <UserList category={category} />
      </div>
      <Button>
        <button className="downloadBtn" onClick={printToPdf}>
          DOWNLOAD
        </button>
      </Button>
    </Container>
  );
}

export default LeaderBoards;