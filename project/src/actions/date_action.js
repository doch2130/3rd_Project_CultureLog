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
export function dateData(date) {
  const request = axios
    .post('/api/users/date', date)
    .then((response) => response.data);
  return {
    type: DATE,
    payload: request,
  };
}
