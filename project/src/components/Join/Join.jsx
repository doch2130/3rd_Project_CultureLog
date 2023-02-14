// import React from 'react';
// import styled from 'styled-components';
// import Header from '../Header';

// const Div2 = styled.div`
//   margin: auto;
//   width: 500px;
//   padding: 300px;
//   text-align: center;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   input {
//     width: 350px;
//     height: 60px;
//     border-top: none;
//     border-left: none;
//     border-right: none;
//     border-bottom: 1.5px solid black;
//     outline: none;
//   }
//   h1 {
//     font-weight: 700;
//     font-size: 40px;
//     color: #d2b6a9;
//   }
//   button {
//     background-color: #d2b6a9;
//     color: #f3e9e9;
//     border-radius: 4px;
//     margin-top: 20px;
//     width: 80px;
//     box-shadow: 0 2px 8px rgba(230, 115, 53, 0.25);
//     font-size: 17px;
//   }
// `;
// export default function Join() {
//   const BtnJoin = () => {
//     console.log('click Join');
//   };
//   return (
//     <>
//       <Header />
//       <Div2>
//         <h1>JOIN</h1>
//         <input id="id" name="userid" type="text" value="아이디" />
//         <br />
//         <input id="pw" name="userpw" type="text" value="비밀번호" />
//         <br />
//         <input id="pw2" name="userpw" type="text" value="비밀번호 확인" />
//         <button type="submit" onClick={BtnJoin}>
//           회원가입
//         </button>
//       </Div2>
//     </>
//   );
// }
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../actions/user_action';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Header';

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
    width: 80px;
    box-shadow: 0 2px 8px rgba(230, 115, 53, 0.25);
    font-size: 17px;
  }
`;
export default function Join() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault(); //이걸 써야 페이지가 초기화되는 것을 막을 수 있다.
    // console.log('Email',Email)
    // console.log('Password',Password)
    if (Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }
    let body = {
      email: Email,
      password: Password,
    };
    //리덕스를 쓰지 않을 경우
    //axios.post('/api/users/register', body)

    dispatch(registerUser(body))
      //랜딩페이지(초기페이지로 렌딩)
      //회원가입 성공시 '/login'로 이동.
      .then((response) => {
        if (response.payload.success) {
          navigate('/login');
          alert('회원가입 성공! culture-log start!');
        } else {
          alert('회원가입에 실패했습니다.');
        }
      });
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form
        // style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <Div2>
          <Header />
          <h1>JOIN</h1>
          <label>ID</label>
          <input type="text" value={Email} onChange={onEmailHandler} />
          <label>Password</label>
          <input
            type="password"
            value={Password}
            onChange={onPasswordHandler}
          />
          <label>Confirm Password</label>
          <input
            type="password"
            value={ConfirmPassword}
            onChange={onConfirmPasswordHandler}
          />
          <br />
          <button type="submit">회원가입</button>
        </Div2>
      </form>
    </div>
  );
}
