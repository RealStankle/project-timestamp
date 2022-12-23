const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get('/', (_, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', (_, res) => {
  const currentDate = new Date();
  res.json({ unix: currentDate.getTime(), utc: currentDate.toUTCString() });
});

app.get('/api/:date', (req, res) => {
  const dateParameter = req.params.date;
  const dateString = isNaN(dateParameter)
    ? dateParameter
    : parseInt(dateParameter);
  const dateObject = new Date(dateString);

  dateObject.toString() === 'Invalid Date'
    ? res.json({ error: 'Invalid Date' })
    : res.json({
        unix: dateObject.getTime(),
        utc: dateObject.toUTCString(),
      });
});

const listener = app.listen(3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
