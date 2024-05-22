//{name: "balls", email: "balls@outlook.com", dateOfBirth: "2000-09-06"}
//https://pe-uk-ordering-api-fd-eecsdkg6btfeg0cc.z01.azurefd.net/marketinglist/subscribe

const $ = (...args)=>{
	return document.querySelector(...args)
}

const start = new Date(1716364800000).getTime()
const end = new Date(1716408000000).getTime()

setInterval(()=>{
	const percentage = (new Date().getTime() - start) / (end - start) * 100
	$("#progress-bar").innerText = percentage.toString().substring(0,15) + "%"
	$("#progress-bar").style.background = `linear-gradient(90deg, red ${percentage}%, white ${percentage}%)`
})

// $("#newsletter-subscribe").addEventListener("click", async ()=>{
// 	if (!$("#newsletter-email").value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
// 		$("#newsletter-email").style.outline = "solid #fa283d 3px"
// 		return
// 	}
// 	$("#newsletter-email").disabled = true
// 	$("#newsletter-subscribe").disabled = true
// 	const data = {
// 		email: $("#newsletter-email").value
// 	}
// 	const response = await fetch("/newsletter", {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify(data)
// 	})
// 	$("#newsletter").innerHTML = "<h1>Signed up successfully!</h1>"
// })