import express from 'express';
import fs from 'fs';
import dotenv from 'dotenv'

import api from './routes/api.js'

dotenv.config()

const app = express();

app.set('view engine', 'ejs')

app.use("/assets", express.static('assets'));

app.use("/api", api)

app.use("/", (req, res)=>{
	res.render('homepage.ejs')
});

app.use(express.json())

app.use((req, res)=>{
	res.setHeader('content-type','text/html')
	res.end(fs.readFileSync("public/not-found/index.html"))
})

app.listen(5230);
