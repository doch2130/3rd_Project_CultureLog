import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './YeongCalendar.css';
import moment from 'moment';
import Pop from './Pop';
import { dateData } from '../actions/date_action';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import axiosurl from '../axiosurl';

export default function YeongCalendar(props) {
  const [value, setValue] = useState(new Date());
  const [modalShow, setModalShow] = useState(false);

  const data = props.data;

  // // 날짜 문자열을 Date 객체로 변환하는 함수
  // const parseDate = (dateString) => {
  //   const [year, month, day] = dateString.split('-');
  //   return new Date(year, month - 1, day);
  // };

  // // 하이라이트 표시를 위한 배열
  const fromDBdate = () => {};

  const dispatch = useDispatch();
  const P = useSelector((state) => state.date.date);
  // const marks = [{ P }];
  const marks = [moment(P).format('DD-MM-YYYY')];

  console.log('내가선택한날짜', value); // 내가 선택한 날짜
  //console.log(data.);
  //console.log(moment(P).format('DD-MM-YYYY'));
  //console.log(new Date()); // 당일 날짜
  //채영님께
  //데이터를 받아서 달력에 이벤트로 띄워질 때
  //Full날짜로 다 받았을 때 데이터가 해당 날짜에 표시될 지 확인해보아야 할 것 같아요
  //만약에 안되면 year, month, date로 했을 때 띄워지는 지 확인해보아야 할 것 같습니다!

  // 날짜 클릭 이벤트핸들러
  const handleDayClick = (value, event) => {
    //console.log('target', moment(value).format('YYYY년 MM월 DD일'));
    axios({
      method: 'get',
      url: axiosurl.fromDBperfo,
      params: { date: moment(value).format('YYYY년 MM월 DD일') },
    }).then((re) => {
      console.log(re.data);
      //if (re.data == null) return setModalShow(!modalShow);
    });
  };
  //Date 객체를 value 매개변수로 받아와서, getDate() 메서드를 이용하여 선택한 날짜 추출
  //이후, 선택한 날짜를 처리하는 로직을 추가

  return (
    <div>
      <Calendar
        onChange={setValue}
        value={value}
        onClickDay={handleDayClick}
        // tileClassName={({ date }) =>
        //   marks.includes(date) ? 'highlight' : null
        // }
        tileClassName={({ date, view }) => {
          if (marks.find((x) => x === moment(date).format('DD-MM-YYYY'))) {
            return 'highlight';
          }
        }}
      />
      {modalShow && (
        <Pop show={modalShow} date={value} onHide={() => setModalShow(false)} />
      )}
      <div className="text-gray-500 mt-4">
        선택한 날짜: {moment(value).format('YYYY년 MM월 DD일')}
      </div>{' '}
    </div>
  );
}
