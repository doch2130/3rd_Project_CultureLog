const axios = require('axios');

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
      'X-Naver-Client-Id': 'hdloT8hr8NgBEFkpD04Z',
      'X-Naver-Client-Secret': 'kG7DAPHBXR',
    },
  }).then((re) => {
    let MovieServerTitle = re.data.items;
    // console.log(MovieServerTitle);
    let MovieClientTitle = [];
    for (let i = 0; i < MovieServerTitle.length; i++) {
      MovieClientTitle.push({
        title: MovieServerTitle[i].title,
        pubDate: MovieServerTitle[i].pubDate,
        director: MovieServerTitle[i].director,
        img: MovieServerTitle[i].image,
      });
    }
    console.log('clienttitle', MovieClientTitle);
    res.send(MovieClientTitle);
  });
};

// 서비스 키
const TTBKey = 'ttbdoch21301445001';
// 페이지 시작
const start = '1';
// 결과 개수
const maxResult = '10';
// 책 종류 - 베스트셀러
const bookType = 'Keyword';

exports.Aladin = (req, res) => {
  axios({
    method: 'get',
    url: `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${[
      TTBKey,
    ]}&QueryType=${bookType}&MaxResults=${maxResult}&start=${start}&SearchTarget=Book&output=js&Version=20131101`,
    // url: `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${[TTBKey]}&QueryType=Bestseller&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101`
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
        categoryName: BookServerTitle[i].categoryName,
        img: BookServerTitle[i].cover,
      });
    }
    console.log('clienttitle', BookClientTitle);
    res.send(BookClientTitle);
  });
};
