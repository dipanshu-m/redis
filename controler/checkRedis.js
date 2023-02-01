const { createClient } = require('redis');
const client = createClient({
  host: '127.0.0.1',
  port: 6379,
});
client.connect().then(() => {
  console.log('created redis');
});
module.exports.checkRedis = async function (req, res, next) {
  const LOCATION = req.params.locationId;
  const hit = await client.get(LOCATION);
  if (hit) {
    console.log('hit', LOCATION);
    res.json(JSON.parse(hit));
  } else {
    next();
  }
};
