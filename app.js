import express from 'express';
const app = express();
import router from './routes/index.js';
import { createServer } from 'http';
import cors from 'cors'

const httpServer = createServer(app);
// ANCHOR express setting
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())
app.use(cors());


app.use('/api', router)

app.get('/', (req, res) => {
    res.send('Hello World')
})
const PORT = 3000;

httpServer.listen(PORT, ()=>{
    console.log(`http server is listening on ${PORT}`)
})