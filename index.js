import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import crypto from 'crypto'

dotenv.config()

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use("/", express.static(join(__dirname, "public")));

app.use(express.json());

let ratelimitedIps = []

app.enable("trust proxy")

app.post("/newsletter", async (req, res) => {
	let ip = req.headers['x-real-ip']
	console.log("signed up to newsletter!!")
	console.log(ratelimitedIps,ip)
	console.log(req.headers['x-real-ip'])
	
	if (ratelimitedIps.includes(ip) || !ip) {
		res.statusCode = 429
		res.end("ratelimit")
		return
	}
	
	//add to ratelimit array
	ratelimitedIps[ratelimitedIps.length] = ip
	
	//remove ip after 5 minutes
	setTimeout(()=>{
		ratelimitedIps.splice(ratelimitedIps.indexOf(ip))
	},300000)

	if (!req.body.email || !req.body.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
		res.statusCode = 400
		res.end("invalid email")
		return
	}
	
  let data = {
    email: req.body.email,
    newsletterIds: [
      "913406e5-4528-4677-ac93-f3bcb7d52717",
      "d0b5eefd-33df-49f2-95d2-454fe75c8a6f",
      "8aa18d8e-d00a-4b1a-afb2-dd1abf9edfa3",
    ],
  };
  await fetch(
    "https://www.theblock.co/api/newsletters/subscribe",
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
      method: "POST",
    },
  );
  const params = {
    username: "non-reai.xyz updater",
    avatar_url: "",
    content: "",
    embeds: [
      {
        title: "Signed up to newsletter",
        color: 15258703,
        thumbnail: {
          url: "",
        },
        fields: [
          {
            name: "Email",
            value: req.body.email,
            inline: true,
          },
					{
						name: "IP",
						value: ip,
						inline: true,
					}
        ],
      },
    ],
  };
  await fetch(
		process.env['DISCORD_WEBHOOK'],
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(params),
    },
  );

  res.end("success");
});

app.listen(5230);
