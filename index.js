const express = require('express');
const { sendCommand } = require('./clients');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/api/command', async (req, res) => {
  const { command } = req.body;
  try {
    await sendCommand(command);
    res.json({ status: 'success' });
  } catch (error) {
    res.json({ status: 'error' });
  }
});

app.listen(port, () => console.log(`App runing on port ${port}`));
