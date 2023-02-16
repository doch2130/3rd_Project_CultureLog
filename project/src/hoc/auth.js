import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../actions/user_action';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, option, adminRoute = null) {
  //option: null, true, false
  //null 아무나 출입 가능
  //true 로그인한 유저만 출입이 가능한 페이지
  //false 로그인한 유저는 출입 불가능한 페이지
  //adminRoute => admin 유저만 들어갈 수 있도록 하려면 true(기본값은 null)
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      //백엔드에서 처리한 정보가 response에 들어 있음.
      dispatch(auth()).then((response) => {
        /* console.log(response);
        console.log(response.payload.isAuth); */
        if (!response.payload.isAuth) {
          //로그인 하지 않은 상태
          if (option) {
            navigate('/login');
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            //admin 아닌데 adminpage에 들어가려고 할 때 막아주는 부분.
            navigate('/');
          } else {
            if (option === false) {
              //그외 login 안한 유저는 처음 페이지로 보내준다.
              navigate('/');
            }
          }
        }
      });
    }, []);
    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
