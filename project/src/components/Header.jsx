import React from 'react';
import { Link } from 'react-router-dom';
import boxImg from '../box.png';
import styled from 'styled-components';

export default function Header() {
  const imgStyle = { width: '50px', marginLeft: '10px' };
  const Nav = styled.nav`
    width: 100%;
    text-align: center;
    li {
      list-style: none;
      color: aliceblue;
    }
  `;

  return (
    <>
      <Nav>
        <ul style={{ display: 'flex', justifyContent: 'space-around' }}>
          <li>
            {' '}
            <Link to="/" style={{ textDecoration: 'none' }}>
              메인
            </Link>
          </li>
          <li>
            <img src={boxImg} alt="상자" style={imgStyle}></img>
            <p>Culture Box</p>
          </li>
          <li>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              로그인
            </Link>
          </li>
        </ul>
      </Nav>
    </>
  );
}
