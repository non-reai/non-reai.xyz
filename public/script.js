//{name: "balls", email: "balls@outlook.com", dateOfBirth: "2000-09-06"}
//https://pe-uk-ordering-api-fd-eecsdkg6btfeg0cc.z01.azurefd.net/marketinglist/subscribe

const $ = (...args)=>{
	return document.querySelector(...args)
}

$("#newsletter-subscribe").addEventListener("click", async ()=>{
	const data = {
		email: $("#newsletter-email").value
	}
	const response = await fetch("/newsletter", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data)
	})
	$("#newsletter").innerHTML = "<h1>Signed up successfully!</h1>"
	
})