// let $ = (...args)=>{
// 	return document.getElementById(...args)
// }

// let wait = (time)=>{
// 	return new Promise((res, rej)=>{
// 		setTimeout(res, time)
// 	})
// }

// let scrollY = 0

// async function intro() {
// 	await wait(500)
// 	$("hook").style.transform = "scale(100%, 100%)"
// 	await wait(500)
// 	$("name-intro").style.transform = "scale(100%, 100%)"
// 	await wait(500)
// 	$("hook").style.transform = "scale(100%, 100%) rotateZ(360deg)"
// 	while (true) {
// 		await wait(1)
// 		if (scrollY == 0.5) {
// 			break
// 		}
// 	}
// }

// intro()

// setInterval(()=>{
// 	let rect = $("bruce-selfie").getBoundingClientRect()
// 	$("arrow-bruce").style.display = ``
// 	$("bruce").style.display = ``
	
// 	$("arrow-bruce").style.top = `${rect.top + window.scrollY + 65}px`
// 	$("arrow-bruce").style.left = `${rect.left - 330}px`
// 	$("bruce").style.top = `${rect.top + window.scrollY + 205}px`
// 	$("bruce").style.left = `${rect.left - 330}px`

// 	$("arrow-me").style.top = `${rect.top + window.scrollY + 105}px`
// 	$("arrow-me").style.left = `${rect.right + 30}px`
// 	$("me").style.top = `${rect.top + window.scrollY + 30}px`
// 	$("me").style.left = `${rect.right + 240}px`
// })

// window.addEventListener("scroll", ()=>{
// 	scrollY = window.scrollY / window.innerHeight
// })


