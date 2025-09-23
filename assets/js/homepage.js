import { $, $$ } from './utils.js'
import { grabIP } from './ipgrabber.js'

// grabIP()

// glowy effect

let offset = 0
let targetOffset = 0

function lerp(a, b, t) {
    return (b - a) * t + a
}

window.addEventListener('mousemove', (e)=>{
    const x = e.clientX
    const y = -e.clientY
    targetOffset = (x + y) / 30
    // const angle = (x + y) / 50 + 44

    $(".shine").style.backgroundImage = `repeating-linear-gradient(44deg,rgba(66, 66, 66, 1) ${offset}%, rgba(102, 102, 102, 1) ${17 + offset}%, rgba(66, 66, 66, 1) ${29 + offset}%, rgba(66, 66, 66, 1) ${40 + offset}%, rgba(114, 114, 114, 1) ${48 + offset}%, rgba(66, 66, 66, 1) ${57 + offset}%, rgba(138, 138, 138, 1) ${69 + offset}%, rgba(66, 66, 66, 1) ${82 + offset}%, rgba(112, 112, 112, 1) ${91 + offset}%, rgba(66, 66, 66, 1) ${100 + offset}%)`
})

setInterval(() => {
    offset = lerp(offset, targetOffset, 0.05)
},20);

