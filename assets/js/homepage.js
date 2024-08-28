import { $ } from '/assets/js/selectorUtils.js'
import { grabIP } from '/assets/js/ipgrabber.js'

// grabIP()

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

const MOTDResponse = await fetch("/assets/json/MOTD.json")
const MOTD = (await MOTDResponse.json())

$("#title-of-the-day").innerHTML = MOTD.TOTD
$("#message-of-the-day").innerHTML = MOTD.MOTD

const start = new Date(1722856200000).getTime()
const end = new Date(1747851240000).getTime()

setInterval(()=>{
	const percentage = (new Date().getTime() - start) / (end - start) * 100
	$("#school-progress-bar > div").innerText = percentage.toString().substring(0,15) + "%"
	$("#school-progress-bar > div").style.background = `linear-gradient(90deg, red ${percentage}%, white ${percentage}%)`
})