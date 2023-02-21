import React, { useEffect, useState } from 'react';
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

  const [data, setData] = useState([]);
  const [marks, setMarks] = useState([]);

  // 클라이언트에서 marks 배열을 유지하기 위해서는, useState 훅을 이용하여 marks 배열을 상태값으로 유지

  // useEffect(() => {
  //   axios.get('/data').then((response) => {});
  // }, []);

  // axios({ method: 'get', url: 'axiosurl.fromDBperfo', timeout: 5000 })
  //   .then((response) => {
  //     const data = response.data.data;
  //     const marks = response.data.marks;
  //     setData(data);
  //     setMarks(marks);
  //   })
  //   .catch((error) => {
  //     if (error.response) {
  //       console.log(error.response.data);
  //       console.log(error.response.status);
  //       console.log(error.response.headers);
  //     } else if (error.request) {
  //       console.log(error.request);
  //     } else {
  //       console.log('Error', error.message);
  //     }
  //     console.log(error.config);
  //   });

  // // 하이라이트 표시를 위한 배열
  const fromDBdate = () => {};
  const dispatch = useDispatch();
  const P = useSelector((state) => state.date.date);
  // const marks = [{ P }];
  //const marks = [moment(P).format('DD-MM-YYYY')];
  //const marks = data.map((item) => new Date(item.date));
  console.log('내가선택한날짜', value); // 내가 선택한 날짜

  const user = useSelector((state) => state.user.loginSuccess);
  const handleDayClick = (value, event) => {
    //console.log('user', user);
    const clickedDate = moment(value).format('YYYY년 MM월 DD일');

    axios({
      method: 'get', //데이터가 없어도 비동기 처리가 되기때문에 then()메서드가 항상 실행된다.
      url: axiosurl.fromDBperfo,
      params: { date: clickedDate, user: user.email },
    }).then((response) => {
      console.log('data', response.data);
      setData(response.data);
      setModalShow(!modalShow);
    });
  };

  //서버에서는 데이터가 있는 경우에는 해당 데이터를 JSON 형태로 응답하고, 데이터가 없는 경우에는 빈 JSON 객체 {}를 응답

  // 날짜 클릭 이벤트핸들러
  // const handleDayClick = (value, event) => {
  //   //console.log('target', moment(value).format('YYYY년 MM월 DD일'));
  //   axios({
  //     method: 'get',
  //     url: axiosurl.fromDBperfo,
  //     params: { date: moment(value).format('YYYY년 MM월 DD일') },
  //   }).then((re) => {
  //     console.log(re.data);
  //     if (re.data == null) {
  //       setModalShow(!modalShow);
  //     } else alert(re.data);
  //   });
  // };

  return (
    <div>
      <Calendar
        onChange={setValue}
        value={value}
        onClickDay={handleDayClick}
        // tileClassName={({ date }) =>
        //   marks.includes(moment(date).format('DD-MM-YYYY')) ? 'highlight' : null
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
        <div>
          {data.length > 0
            ? data[0].map((el) => {
                return <p>{el.title}</p>;
              })
            : 'perfo default'}
          {data.length > 0
            ? data[1].map((el) => {
                return <p>{el.title}</p>;
              })
            : 'book default'}
          {data.length > 0
            ? data[2].map((el) => {
                return <p>{el.title}</p>;
              })
            : 'movie default'}
        </div>
      </div>
    </div>
  );
}
// const data = response.data;
// if (Object.keys(data).length === 0) {
//   alert(data.title);
