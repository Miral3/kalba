import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// 주소 변경시 페에지 새로고침X, 현재 주소에 관련된 정보를 props로 
// 쉽게 조회하거나 사용할 수 있는 컴포넌트
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);