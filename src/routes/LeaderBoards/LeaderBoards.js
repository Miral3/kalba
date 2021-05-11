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
  .print_to_pdf {
    display: flex;
    height: auto;
    margin-top: 1rem;
    justify-content: space-around;
    width:100%;
  }
`;

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

const saveBoard = () => {
  const imageDiv = document.getElementById("print_to_pdf");
  window.scrollTo(0, 0);
  html2canvas(imageDiv, {}).then(canvas => {
    download(canvas.toDataURL(), "ranking_list.png");
  });
};

const download = (url, fileName) => {
  const isMobile = /iPhone|iPad|iPod|Android|BlackBerry|Windows Phone|webOS/i.test(navigator.userAgent);
<<<<<<< Updated upstream
  if(isMobile){
=======
<<<<<<< HEAD
  if (!isMobile) {
=======
  if(isMobile){
>>>>>>> 1c21386f2f90a8f9356e83ed4ac5da0074a341c0
>>>>>>> Stashed changes
    loadImageInThisPage(url, fileName);
  } else {
    downloadURL(url, fileName);
  }
};

const loadImageInThisPage = (url, fileName) => {
  document.write("<html><body>");
  document.write("<a href=''><img src='" + url + "' alt = '" + fileName + "'></a>");
  document.write("</body><html>");
  if (window.localStorage.getItem("isAlertOn") !== "true") {
    window.setTimeout(function () {
      if (window.confirm("사진을 꾹 눌러 저장하세요.\n사진을 누르면 이전 페이지로 돌아갑니다.\n\n알림을 다시 보지 않으시겠습니까?")) {
        window.localStorage.setItem("isAlertOn", "true");
      };
    }, 1);
  }
}

const downloadURL = (url, fileName) => {
  const link = document.createElement("a")
  link.download = fileName;
  link.href = url;
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
        <button className="downloadBtn" onClick={saveBoard}>
          DOWNLOAD
        </button>
      </Button>
    </Container>
  );
}

export default LeaderBoards;