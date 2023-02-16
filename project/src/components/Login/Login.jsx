import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../actions/user_action';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// style={{
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   width: '100%',
//   height: '100vh',
// }}

const Div1 = styled.div`
  margin: auto;
  width: 500px;
  padding: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-weight: 700;
    font-size: 40px;
    color: #572b2b;
  }
`;
const Input = styled.input`
  width: 350px;
  height: 70px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1.5px solid black;
  outline: none;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Div2 = styled.div`
  text-align: center;
  margin-top: -250px;
  width: 100%;
  align-items: center;
  button {
    background-color: #d2b6a9;
    color: #f3e9e9;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(230, 115, 53, 0.25);
    display: inline-block;
    margin-right: 10px;
  }
`;
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault(); //이걸 써야 페이지가 초기화되는 것을 막을 수 있다.
    // console.log('Email', Email);
    // console.log('Password', Password);

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body))
      //랜딩페이지(초기페이지로 렌딩)
      //로그인 성공시 '/'로 이동.
      .then((response) => {
        // 현재 방 목록 받아오기
        if (response.payload.loginSuccess) {
          navigate('/');
        } else {
          alert('로그인에 실패했습니다.');
        }
      });
  };
  const navigateToJoin = () => {
    navigate('/Join');
  };

  return (
    <>
      <Form onSubmit={onSubmitHandler}>
        <Div1>
          <h1>LOGIN</h1>
          <label>ID</label>
          <Input type="text" value={Email} onChange={onEmailHandler} />
          <label>Password</label>
          <Input
            type="password"
            value={Password}
            onChange={onPasswordHandler}
          />
        </Div1>
        <Div2>
          <button type="submit">로그인</button>
          <button onClick={navigateToJoin}>회원가입</button>
        </Div2>
      </Form>
    </>
  );
}
