import { $ } from '/assets/js/selectorUtils.js'

const response = await fetch("/assets/html/nav.html")
const navHtml = await response.text()

$("nav").innerHTML = navHtml