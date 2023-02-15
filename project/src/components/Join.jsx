import React from 'react';
import styled from 'styled-components';

const Div2 = styled.div`
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
    width: 101px;
    box-shadow: 0 2px 8px rgba(230, 115, 53, 0.25);
    font-size: 17px;
  }
`;
export default function Join() {
  const BtnJoin = () => {
    console.log('click Join');
  };
  return (
    <>
      <Div2>
        <h1>JOIN</h1>
        <input id="id" name="userid" type="text" value="아이디" />
        <br />
        <input id="pw" name="userpw" type="text" value="비밀번호" />
        <br />
        <input id="pw2" name="userpw" type="text" value="비밀번호 확인" />
        <button type="submit" onClick={BtnJoin}>
          회원가입
        </button>
      </Div2>
    </>
  );
}
