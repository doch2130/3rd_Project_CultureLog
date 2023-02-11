import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';

const Div1 = styled.div`
  margin: auto;
  width: 500px;
  padding: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    width: 350px;
    height: 60px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1.5px solid black;
    outline: none;
  }
  h1 {
    font-weight: 700;
    font-size: 40px;
    color: #d2b6a9;
  }
  button {
    background-color: #d2b6a9;
    color: #f3e9e9;
    border-radius: 4px;
    margin-top: 20px;
    width: 60px;
    box-shadow: 0 2px 8px rgba(230, 115, 53, 0.25);
    font-size: 17px;
  }
`;

export default function Login() {
  const BtnLogin = () => {
    console.log('click login');
  };

  let [id, setId] = useState('');
  let [pw, setPw] = useState('');

  const idHandler = (event) => {
    setId(event.currentTarget.value);
  };
  const pwHandler = (event) => {
    setPw(event.currentTarget.value);
  };

  return (
    <>
      <Header />
      <Div1>
        <h1>LOGIN</h1>
        <input
          id="id"
          name="userid"
          type="text"
          value="아이디"
          onChange={idHandler}
        />
        <br />
        <input
          id="pw"
          name="userpw"
          type="text"
          value="비밀번호"
          onChange={pwHandler}
        />
        <br />
        <button type="submit" onClick={BtnLogin}>
          로그인
        </button>
      </Div1>
    </>
  );
}
