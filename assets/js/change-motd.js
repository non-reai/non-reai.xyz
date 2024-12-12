import { $ } from '/assets/js/selectorUtils.js'

$("#change-button").addEventListener("click", async ()=>{
	const response = await fetch("/set-motd", {
		method: "POST",
		body: JSON.stringify({
			TOTD: $("#totd").value,
			MOTD: $("#motd").value
		}),
		headers: {
			"content-type": "application/json",
		}
	})
	alert(await response.text())
})