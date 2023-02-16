import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import Modal from './Modal';

export default function YeongCalendar(props) {
  const [value, setValue] = useState(new Date());
  const [select, setSelect] = useState(false);
  return (
    <div>
      <Calendar
        onChange={setValue}
        value={value}
        onClickDay={(value, event) => setSelect(!select)}
      />
      {select && (
        <Modal closeModal={() => setSelect(!select)}>
          <select />
        </Modal>
      )}

      <div className="text-gray-500 mt-4">
        선택한 날짜: {moment(value).format('YYYY년 MM월 DD일')}
      </div>
    </div>
    //  onClickDay={(value, event) => alert('Clicked day: ', value)}
  );
}
