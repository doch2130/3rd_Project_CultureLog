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
    let servertitle = re.data.items;
    console.log(servertitle);
    let clienttitle = [];
    for (let i = 0; i < servertitle.length; i++) {
      clienttitle.push({
        title: servertitle[i].title,
        pubDate: servertitle[i].pubDate,
        director: servertitle[i].director,
      });
    }
    console.log('clienttitle', clienttitle);
    res.send(clienttitle);
  });
};
