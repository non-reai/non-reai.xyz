import { $ } from '/assets/js/selectorUtils.js'
import { grabIP } from '/assets/js/ipgrabber.js'

// grabIP()

//birthday confetti

const date = new Date()

if (date.getDate() == 2 && date.getMonth() == 8) {
	confetti({
		particleCount: 1000,
		spread: 180,
		origin: {
			x: 0.5,
			y: 1.5
		},
		startVelocity: 100
	})
}

//position the image

function getPosition(element) {
	const rect = element.getBoundingClientRect()
	return {
		top: rect.top + window.scrollY,
		bottom: rect.bottom + window.scrollY,
		left: rect.left + window.scrollX,
		right: rect.right + window.scrollX,
		height: rect.height,
		width: rect.width,
	}
}

const updateFrame = function() {
	window.innerWidth
	const rect = getPosition($("#introduction > div:nth-child(2) > img"))
	const arrowElement = $("#introduction > div:nth-child(1) > div")

	if (window.innerWidth >= 1000) {
		arrowElement.classList.remove("no-display")
		arrowElement.style.top = `${rect.top + rect.height - 100}px`
		arrowElement.style.right = `${window.innerWidth - rect.left + 30}px`
	} else {
		arrowElement.classList.add("no-display")
	}
	
	
	
	requestAnimationFrame(updateFrame)
}

requestAnimationFrame(updateFrame)

//motd

const MOTDResponse = await fetch("/assets/json/MOTD.json")
const MOTD = (await MOTDResponse.json())

$("#title-of-the-day").innerHTML = MOTD.TOTD
$("#message-of-the-day").innerHTML = MOTD.MOTD

// school progress bar

const startSchool = new Date(1722856200000).getTime()
const endSchool = new Date(1747842300000).getTime()

setInterval(()=>{
	const percentage = (new Date().getTime() - startSchool) / (endSchool - startSchool) * 100
	$("#school-progress-bar > div").innerText = percentage.toString().substring(0,15) + "%"
	$("#school-progress-bar > div").style.background = `linear-gradient(90deg, red ${percentage}%, white ${percentage}%)`
})

// NNN progress bar

// const startNNN = new Date(1730433600000).getTime()
// const endNNN = new Date(1733029200000).getTime()

// setInterval(()=>{
// 	const percentage = (new Date().getTime() - startNNN) / (endNNN - startNNN) * 100
// 	$("#nnn-progress-bar > div").innerText = percentage.toString().substring(0,15) + "%"
// 	$("#nnn-progress-bar > div").style.background = `linear-gradient(90deg, #f4fac0 ${percentage}%, #fac0c0 ${percentage}%)`
// })
