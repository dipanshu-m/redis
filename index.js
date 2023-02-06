const { response } = require('express');
const express = require('express');
const app = express();
const { createClient } = require('redis');
const { checkRedis } = require('./controller/checkRedis');
const dotenv = require('dotenv');
dotenv.config();
const client = createClient({
  host: '127.0.0.1',
  port: process.env.CLIENTPORT,
});

// let sourceURL = 'https://jsonplaceholder.typicode.com/todos';
app.listen(process.env.PORT, () => {
  console.log('created server at ' + process.env.PORT + ' port');
  client.connect().then(() => {
    console.log('connected to redis');
  }).catch(err => {
    console.log("error:", err);
  });
});
// app.use(checkRedis);
app.use(express.json());
app.get('/location/:locationId/weather', checkRedis, async (req, res) => {
  const LOCATION = req.params.locationId;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${LOCATION}&appid=99a0f58d6c5ed7b6f7f154e49e826944`,
    {
      method: 'get',
    }
  )
    .then((response) => {
      return response.json();
    })
    .then(async (data) => {
      console.log('miss', LOCATION);
      const dataString = JSON.stringify(data);
      const l = await client
        .setEx(LOCATION, '3600', dataString)
        .then((data) => {
          console.log(data);
        });
      res.json(data);
    })
    .catch(async (err) => {
      console.log('ERR', err);
      res.json(err);
    });
});
