import express from 'express';
import fs from 'fs';

const app = express();

app.use("/", express.static('public'));

app.use("/assets", express.static('assets'));

app.use(express.json())

app.post("/set-motd", (req, res)=>{
	fs.writeFileSync("./assets/json/MOTD.json", JSON.stringify(req.body))
	res.end("Changed")
})

app.use((req, res)=>{
	res.end(fs.readFileSync("public/not-found/index.html"))
})

app.listen(5230);
