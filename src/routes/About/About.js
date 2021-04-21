/* React */
import React from 'react';

/* Styled */
import styled from 'styled-components';

import { MdEmail } from "react-icons/md";
import { AiFillGithub } from "react-icons/ai";

import data1 from "./data1.jpeg";
import data2 from "./data2.jpeg";

const Container = styled.div`
padding: 50px 0;
  .logo {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    span {
      color: black;
      font-size: 50px;
      font-family: "supercell";
    }
  }
  .team-info {
    display: flex;
    justify-content: center;
    border-top: 2px solid #E6E6E6;
    ul {
      margin-right:10px;
      text-align: center;
      padding: 0;
      .emoji {
        width: 60%;
        margin-bottom: 20px;
      }
      li {
        margin-bottom: 10px;
        font-weight: 600;
      }
      .name {
        font-size: 25px;
      }
      .email {
        color: #4b7bec;
        .icon-email {
          margin-right: 3px;
        }
      }
      .contact {
        border-top: 2px solid #E6E6E6;
        padding-top: 10px;
        .icon-github{
          font-size: 30px;
        }
      }
    }
  }
`;

const Home = () => {

  return (
    <Container>
      <div className="logo">
        <span>Kalba</span>
      </div>
      <div className="team-info">
        <ul>
          <li>
            <img className="emoji" src={data1} alt="emoji" />
          </li>
          <li>
            <span className="name">Miral</span>
          </li>
          <li>
            <span classNmae="role">front-end</span>
          </li>
          <li className="email">
            <MdEmail className="icon-email" />
            <span classNmae="email">Email Me</span>
          </li>
          <div className="contact">
            <a href="https://github.com/Miral3">
              <AiFillGithub className="icon-github" />
            </a>
          </div>
        </ul>
        <ul>
          <li>
            <img className="emoji" src={data2} alt="emoji" />
          </li>
          <li>
            <span className="name">Potion</span>
          </li>
          <li>
            <span classNmae="role">back-end</span>
          </li>
          <li className="email">
            <MdEmail className="icon-email" />
            <span classNmae="email">Email Me</span>
          </li>
          <div className="contact">
            <a href="https://github.com/potionk">
              <AiFillGithub className="icon-github" />
            </a>
          </div>
        </ul>
      </div>
    </Container>
  );
}

export default Home;