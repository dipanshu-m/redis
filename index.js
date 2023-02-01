const { response } = require('express');
const express = require('express');
const app = express();
const { createClient } = require('redis');
const { checkRedis } = require('./controler/checkRedis');

const client = createClient({
  host: '127.0.0.1',
  port: 6379,
});

// let sourceURL = 'https://jsonplaceholder.typicode.com/todos';
app.listen(3000, () => {
  console.log('created server at 3000 port');
  client.connect().then(() => {
    console.log('connected to redis');
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
