require('dotenv').config();
const express = require('express');
const cors = require('cors'); // cors 패키지 임포트
const jwt = require('jsonwebtoken');
const path = require('path');
const bodyParser = require('body-parser'); // body-parser 추가
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

const OPENAI_API_KEY = 'sk-proj-bDcYXpo7AURxgJpUzXm2T3BlbkFJCOXwdqM825bIkl6mLSog';


app.use(cors());
app.use(express.json());

// 환경 변수에서 비밀 키를 로드
const secretKey = 'kidy1998';

// CORS 미들웨어 설정
app.use(cors());

// body-parser 설정
app.use(bodyParser.json());

// 정적 파일 제공 설정
app.use(express.static(path.join(__dirname, '..'))); // 상위 디렉토리를 정적 파일로 제공

// 기본 라우트 추가
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'main.html'));
});

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

// Llama3 API 프록시 라우트 추가
app.post('/api/generate', async (req, res) => {
  console.log("llama3 send ok")
  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify(req.body)
  });


    if (response.ok) {
      const data = await response.json();
      console.log("llama3 response ok")
      res.json(data);
    } else {
      res.status(response.status).send(response.statusText);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
