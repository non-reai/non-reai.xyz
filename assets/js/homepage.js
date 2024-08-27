import { $ } from '/assets/js/selectorUtils.js'

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
	const rect = getPosition($("#introduction > div:nth-child(2) > img"))
	const arrowElement = $("#introduction > div:nth-child(1) > div")
	arrowElement.classList.remove("no-display")
	arrowElement.style.top = `${rect.top + rect.height - 100}px`
	arrowElement.style.right = `${window.innerWidth - rect.left + 30}px`
	
	requestAnimationFrame(updateFrame)
}

requestAnimationFrame(updateFrame)

const MOTDResponse = await fetch("/assets/json/MOTD.json")
const MOTD = (await MOTDResponse.json())

$("#title-of-the-day").innerText = MOTD.TOTD
$("#message-of-the-day").innerText = MOTD.MOTD