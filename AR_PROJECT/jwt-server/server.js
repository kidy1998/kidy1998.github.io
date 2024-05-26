require('dotenv').config();
const express = require('express');
const cors = require('cors'); // cors 패키지 임포트
const jwt = require('jsonwebtoken');
const path = require('path');
const bodyParser = require('body-parser'); // body-parser 추가
const app = express();
const port = 5556;

// 환경 변수에서 비밀 키를 로드
const secretKey = 'kidy1998';

// CORS 미들웨어 설정
app.use(cors());

// body-parser 설정
app.use(bodyParser.json());

// 정적 파일 제공 설정
app.use(express.static(path.join(__dirname, 'public')));

// JWT 생성 엔드포인트
app.get('/app/jwt/get', (req, res) => {
  const payload = {
    user: 'exampleUser',
    exp: Math.floor(Date.now() / 1000) + (60 * 5) // Token expires in 5 minutes
  };

  const token = jwt.sign(payload, secretKey);
  res.json({ jwt: token });
});

// OpenAI Moderation Proxy 엔드포인트
app.post('/openai/v1/moderations', async (req, res) => {
  const input = req.body.input;

  // 예시 응답 데이터
  const data = {
    results: input.map(text => ({
      flagged: text.includes('badword'),
      categories: {
        hate: text.includes('hate'),
        violence: text.includes('violence')
      },
      category_scores: {
        hate: text.includes('hate') ? 0.9 : 0.1,
        violence: text.includes('violence') ? 0.8 : 0.1
      }
    }))
  };

  res.json(data);
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
