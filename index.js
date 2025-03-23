const express = require('express');
const { getAuthUrl, generateTokens, getUserInfo } = require('./auth.js'); // Assuming auth.js has these functions
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Route to initiate OAuth and get the authorization URL
app.get('/auth', (req, res) => {
  const authUrl = getAuthUrl();
  res.redirect(authUrl);
});

// Route to handle the callback and generate access token
app.get('/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const { accessToken } = await generateTokens(code);
    res.json({ accessToken });
  } catch (error) {
    res.status(500).send('Failed to generate tokens');
  }
});

// Route to get user info after OAuth authorization
app.get('/userinfo', async (req, res) => {
  const { accessToken } = req.query;
  try {
    const userInfo = await getUserInfo(accessToken);
    res.json(userInfo);
  } catch (error) {
    res.status(500).send('Failed to retrieve user info');
  }
});

app.listen(port, () => {
  console.log(`OAuth app is running on port ${port}`);
});
