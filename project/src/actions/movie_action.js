import axios from 'axios';
import { MOVIE } from './types';

export function callMovieAPI(dataTosubmit) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'http://localhost:5000/movieAPI',
      params: dataTosubmit,
    }).then((res) => {
      console.log('actionfunction', res.data);

      resolve({
        type: MOVIE,
        payload: res.data,
      });
    });
  });
}
