import express from 'express';
import fs from 'fs';
import dotenv from 'dotenv'

import api from './routes/api.js'

dotenv.config()

const app = express();

app.set('view engine', 'ejs')

app.use("/assets", express.static('assets'));

app.use("/api", api)

app.get("/", (req, res)=>{
	res.render('homepage.ejs')
})

app.get("/gallery", (req, res)=>{
	res.render('gallery.ejs')
})

app.use(express.json())

app.use((req, res)=>{
	res.render('404.ejs')
})

app.listen(5230);
