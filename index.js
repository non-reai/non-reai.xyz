import express from "express";
import fetch from 'node-fetch'

const app = express();

app.use("/", express.static('public'));

app.use(express.json())

app.post("/newsletter", async (req, res)=>{
	let data = {
		email: req.body.email,
		newsletterIds: ["913406e5-4528-4677-ac93-f3bcb7d52717","d0b5eefd-33df-49f2-95d2-454fe75c8a6f","8aa18d8e-d00a-4b1a-afb2-dd1abf9edfa3"]
	}
	let response = await fetch("https://www.theblock.co/api/newsletters/subscribe", {
		"headers": {
			"content-type": "application/json",
		},
		"body": JSON.stringify(data),
		"method": "POST"
	});
	res.end(await response.text())
})

app.listen(5230);
