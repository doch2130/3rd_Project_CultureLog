const axios = require('axios');

const TTBKey = '키 입력';

axios({
  method: 'get',
  url: `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${[TTBKey]}&QueryType=ItemNewAll&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101`
})
.then((response) => {
  console.log(response.data);
});
