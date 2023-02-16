import express from 'express';
const app = express();
import router from './routes/index.js';

app.use('/api', router)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(3000)