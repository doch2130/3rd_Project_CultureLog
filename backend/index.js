const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const router = require('./routes/index');
const cors = require('cors');

let corsOption = {
  origin: 'http://localhost:3000', // 허락하는 요청 주소
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  optionsSuccessStatus: 200, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
};

app.use(cors(corsOption));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.json());
app.use('/', router);

app.get('*', (req, res) => {
  res.send('주소가 존재하지 않습니다. 다시 한 번 확인해주세요.');
});

app.listen(5000, () => {
  console.log('server port', 5000);
});
