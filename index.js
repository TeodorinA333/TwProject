import express from 'express';
import env from 'dotenv';
import DB_Init from './entities/DB_Init.js';
import createDbRouter from './routes/createDbRoute.js';
import groupEventsRouter from './routes/GrupaEventsRouter.js';
import cors from "cors";
import axios from "axios";

env.config();

let app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

DB_Init();

const link = "http://localhost:9000/api/group";


async function getPosts(){
  let posts = (await axios.get(link)).data;
  console.log(posts);
  return posts;
}

// const corsOptions = {
//   origin: 'http://localhost:9000/api/group',
//   credentials: true,
//   methods: 'GET, PUT, PATCH, POST, DELETE'
// }



app.use(cors());
app.use("/api", createDbRouter);
app.use("/api", groupEventsRouter);

let port = process.env.PORT || 8001;
app.listen(port);
console.log('API is runnning at ' + port);

export {getPosts};