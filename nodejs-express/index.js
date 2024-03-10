import express from 'express';
import { rateLimit } from 'express-rate-limit'
import { Store } from '@rlimit/storage';

const app = express();

let rlimit = rateLimit({
  // limit IP address to 3 requests every 5 seconds
  limit: 3,
  windowMs: 5_000,
  store: new Store({
    namespace: 'example', // your rlimit.com namespace 
  })
})

app.use(rlimit)
app.get('/', async (req, res) => {
  res.send('Hello World!')
});

app.listen(3000, () => {
  console.log("Express application started");
});
