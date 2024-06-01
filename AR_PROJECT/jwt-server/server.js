require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = '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';

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'main.html'));
});

app.post('/api/generate', async (req, res) => {
  console.log("Request received at /api/generate");

  try {
    const body = {
      model: 'gpt-3.5-turbo', // 사용할 모델
      messages: req.body.messages,
      temperature: req.body.temperature,
      max_tokens: req.body.max_tokens
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      const data = await response.json();
      res.json(data);
    } else {
      const errorText = await response.text();
      console.error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
      res.status(response.status).send(response.statusText);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
