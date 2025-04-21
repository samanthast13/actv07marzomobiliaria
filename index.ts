import express from 'express';
import plotboxroutes from './src/routes/list';

const app = express();
const Port = 3000


app.use("/", plotboxroutes );

app.listen(Port, () => console.log('Server corriendo'))

