import express from 'express'
import fetch from 'node-fetch'

const router = express.Router()

let currentAccessToken = "If you see this, access token is broken..."
let nextRefresh = 0

async function refreshAccessToken() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", "Basic "+process.env.DBX_ENCODED_USERNAME_PASSWORD);

    const urlencoded = new URLSearchParams();
    urlencoded.append("refresh_token", process.env.DBX_REFRESH_TOKEN);
    urlencoded.append("grant_type", "refresh_token");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow"
    };

    let results = await (await fetch("https://api.dropboxapi.com/oauth2/token", requestOptions)).json()

    currentAccessToken = results.access_token
    nextRefresh = Date.now() + (1000 * results.expires_in)
}

router.get("/access-token", async (req, res)=>{
    if (Date.now() > nextRefresh) {
        await refreshAccessToken()
    }
   
    res.end(currentAccessToken)
})

export default router