import { $ } from '/assets/js/selectorUtils.js'

const navResponse = await fetch("/assets/html/nav.html")
const navHtml = await navResponse.text()

$("nav").innerHTML = navHtml

const footerReponse = await fetch("/assets/html/footer.html")
const footerHtml = await footerReponse.text()

$("footer").innerHTML = footerHtml