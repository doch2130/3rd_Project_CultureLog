import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './YeongCalendar.css';
import moment from 'moment';
//import Modal from './Modal';
import Pop from './Pop';

export default function YeongCalendar(props) {
  const [value, setValue] = useState(new Date());
  console.log(value); // 내가 선택한 날짜
  //console.log(new Date()); // 당일 날짜
  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <Calendar
        onChange={setValue}
        value={value}
        onClickDay={(value, event) => setModalShow(!modalShow)}
      />
      {modalShow && <Pop show={modalShow} onHide={() => setModalShow(false)} />}
      <div className="text-gray-500 mt-5">
        선택한 날짜 : {moment(value).format('YYYY년 MM월 DD일')} <br />
      </div>{' '}
    </div>
  );
}
