# START
npm start

# START Production
npm run production

# SETTING

# backend/.env
PRODUCTION_HOST=http://0.0.0.0:4500
LOCAL_HOST=http://localhost:3000
MONGO_URI=mongodb+srv://-----.mongodb.net/dbName

# NaverId, NaverSecret = 네이버 검색 API
# TTBKey = 알라딘
# ServiceKey = KOPIS
# config/apikeys.js
module.exports = {
  NaverId: '-',
  NaverSecret: '-',
  TTBKey: '-',
  ServiceKey: '-',
};
