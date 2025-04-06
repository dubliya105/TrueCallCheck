const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/api/truecaller', async (req, res) => {
  const number = req.query.q;
  try {
    const response = await axios.get(`https://truecaller.privates-bots.workers.dev/?q=${number}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(8080, () => {
  console.log('Proxy server running at 8080');
});
