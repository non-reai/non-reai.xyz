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
	arrowElement.style.top = `${rect.top + rect.height - 100}px`
	arrowElement.style.left = `${rect.left - rect.width - 20}px`
	
	requestAnimationFrame(updateFrame)
}

requestAnimationFrame(updateFrame)