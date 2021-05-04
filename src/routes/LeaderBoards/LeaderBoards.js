/* React */
import React from 'react';

/* Styled */
import styled from 'styled-components';

/* Sub Components */
import Categories from '../../components/Categories/Category';
import UserList from '../../components/UserList';
import html2canvas from 'html2canvas';
import pdfMake from "pdfmake/build/pdfmake";

const Container = styled.div`
  padding-top: 1.5rem;
`

const items = [
  { name: 'score', text: '공격력' },
  { name: 'donations', text: '지원량' }
];

const printToPdf = () => {
  html2canvas(document.getElementById("print_to_pdf")).then(canvas => {
    var data = canvas.toDataURL();
    var pdfExportSetting = {
      content: [
        {
          image: data,
          width: 350
        }
      ]
    };
    pdfMake.createPdf(pdfExportSetting).download("ranking_list.pdf");
  });
};

const LeaderBoards = ({ match }) => {
  const category = match.params.category || 'score';

  return (
    <Container>
      <button onClick={printToPdf}>save</button>
      <Categories items={items} type="leaderboards" any="score" />
      <div id="print_to_pdf">
        <UserList category={category} />
      </div>
    </Container>
  );
}

export default LeaderBoards;