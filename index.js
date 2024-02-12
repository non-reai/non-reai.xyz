import express from "express";
import fetch from "node-fetch";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use("/", express.static(join(__dirname, "public")));

app.use(express.json());

let ratelimitedIps = []


app.post("/newsletter", async (req, res) => {
	console.log(ratelimitedIps)
	if (ratelimitedIps.includes(req.headers["x-forwarded-for"].split(", ")[0])) {
		console.log("reject")
		res.statusCode = 429
		res.end("ratelimit")
		return
	}

	ratelimitedIps[ratelimitedIps.length] = req.headers["x-forwarded-for"].split(", ")[0]

	setTimeout(()=>{
		ratelimitedIps.splice(ratelimitedIps.indexOf(req.headers["x-forwarded-for"].split(", ")[0]))
	},300000)
	
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
    content: req.body.email+" signed up to the newsletter :skull:",
    // embeds: [
    //   {
    //     title: "Signed up to newsletter",
    //     color: 15258703,
    //     thumbnail: {
    //       url: "",
    //     },
    //     fields: [
    //       {
    //         name: "Email",
    //         value: "Whatever you wish to send",
    //         inline: true,
    //       },
    //     ],
    //   },
    // ],
  };
  await fetch(
    "https://discord.com/api/webhooks/1206437907297210408/mDtM_043_rEIBSdDUeuupx_xCvM3duTtFAX0IM_g49i4-U0skGFPSWt3jG4NO0PqX7-f",
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
