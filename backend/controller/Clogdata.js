const axios = require('axios');
const apikeys = require('./apikeys');

exports.Naver = (req, res) => {
  console.log(req.query);
  axios({
    method: 'get',
    url: 'https://openapi.naver.com/v1/search/movie.json',
    params: {
      query: req.query.title,
      display: 20,
    },
    headers: {
      'X-Naver-Client-Id': apikeys.NaverId,
      'X-Naver-Client-Secret': apikeys.NaverSecret,
    },
  }).then((re) => {
    let MovieServerTitle = re.data.items;
    console.log(MovieServerTitle);
    let MovieClientTitle = [];
    for (let i = 0; i < MovieServerTitle.length; i++) {
      MovieClientTitle.push({
        title: MovieServerTitle[i].title,
        pubDate: MovieServerTitle[i].pubDate,
        director: MovieServerTitle[i].director,
        actor: MovieServerTitle[i].actor,
        img: MovieServerTitle[i].image,
      });
    }
    console.log('clienttitle', MovieClientTitle);
    res.send(MovieClientTitle);
  });
};

//알라딘
const TTBKey = apikeys.TTBKey;
const start = '1';
const maxResult = '15';
const sort = 'SalesPoint';
const bookType = 'Keyword';

exports.Aladin = (req, res) => {
  axios({
    method: 'get',
    url: `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${TTBKey}&QueryType=${bookType}&MaxResults=${maxResult}&sort=${sort}&start=${start}&SearchTarget=Book&output=js&Version=20131101`,
    params: {
      query: req.query.title,
    },
  }).then((re) => {
    let BookServerTitle = re.data.item;
    // console.log(BookServerTitle);
    let BookClientTitle = [];
    for (let i = 0; i < BookServerTitle.length; i++) {
      BookClientTitle.push({
        title: BookServerTitle[i].title,
        pubDate: BookServerTitle[i].pubDate,
        author: BookServerTitle[i].author,
        publisher: BookServerTitle[i].publisher,
        categoryName: BookServerTitle[i].categoryName,
        img: BookServerTitle[i].cover,
      });
    }
    console.log('clienttitle', BookClientTitle);
    res.send(BookClientTitle);
  });
};

//코피스 공연

// 서비스키
const SeriveKey = apikeys.ServiceKey;

// 시작 날짜
const stdate = '20221201';
// 종료 날짜
let eddate = '20221231';
//new Date().toISOString().slice(0, 10).split('-').join('');

// 필수 데이터만 입력한 상태의 URL
//const kopisurl =

exports.Kopis = (req, res) => {
  console.log(req.query);
  axios({
    method: 'get',
    url: `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${SeriveKey}&stdate=${stdate}&eddate=${eddate}&cpage=1&rows=10&shprfnm=${req.query.title}`,
  }).then((result) => {
    console.log(result.data);
  });
};
