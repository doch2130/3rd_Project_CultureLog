# SETTING

# backend/.env
NODE_ENV=http://0.0.0.0:4500
LOCAL_ENV=http://localhost:3000

# config/.dev.js
module.exports = {
  mongoURI:
    'mongodb+srv://-----',
};

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
