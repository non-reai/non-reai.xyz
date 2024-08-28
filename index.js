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

app.listen(5230);
