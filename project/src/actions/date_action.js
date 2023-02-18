import axios from 'axios';
import { YEAR, MONTH, DATE } from './types';

export function yearData(year) {
  return {
    type: YEAR,
    payload: year,
  };
}
export function monthData(month) {
  return {
    type: MONTH,
    payload: month,
  };
}
export async function dateData(date) {
  // const request = await axios
  //   .post('/api/date', { date })
  //   .then((response) => response.data);
  // console.log(request);
  return {
    type: DATE,
    payload: date,
  };
}
