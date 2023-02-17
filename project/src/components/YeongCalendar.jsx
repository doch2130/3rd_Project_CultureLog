import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './YeongCalendar.css';
import moment from 'moment';
//import Modal from './Modal';
import Pop from './Pop';
import { useDispatch } from 'react-redux';
import { dateData } from '../actions/date_action';

export default function YeongCalendar() {
  const [value, setValue] = useState(new Date());
  console.log(value); // 내가 선택한 날짜
  //console.log(new Date()); // 당일 날짜
  const [modalShow, setModalShow] = useState(false);
  // const dispatch = useDispatch();
  // dispatch(dateData(value));
  //채영님께
  //데이터를 받아서 달력에 이벤트로 띄워질 때
  //Full날짜로 다 받았을 때 데이터가 해당 날짜에 표시될 지 확인해보아야 할 것 같아요
  //만약에 안되면 year, month, date로 했을 때 띄워지는 지 확인해보아야 할 것 같습니다!
  return (
    <div>
      <Calendar
        onChange={setValue}
        value={value}
        onClickDay={(value, event) => setModalShow(!modalShow)}
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
