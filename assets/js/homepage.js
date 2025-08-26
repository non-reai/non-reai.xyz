import { $, $$ } from './utils.js'

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

// gallery

const GALLERY_KEY = (await (await fetch("/api/access-token")).text())

const listFolderResponse = (await fetch("https://api.dropboxapi.com/2/files/list_folder", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + GALLERY_KEY
    },
    body: JSON.stringify({
        "include_deleted": false,
        "include_has_explicit_shared_members": false,
        "include_media_info": false,
        "include_mounted_folders": false,
        "include_non_downloadable_files": false,
        "path": "",
        "recursive": false
    })
}))

const entries = (await listFolderResponse.json()).entries

const entriesFiltered = entries.sort((a, b)=>{
    return (new Date(a.client_modified).getTime()) < (new Date(b.client_modified).getTime()) ? 1 : -1
})

const images = []

let nextIndex = 0

entriesFiltered.forEach(async (imageData, index) => {
    // download image from id
    const imageResponse = (await fetch("https://content.dropboxapi.com/2/files/download", {
        method: "POST",
        headers: {
            "Dropbox-API-Arg": JSON.stringify({ "path": imageData.id }),
            "Authorization": "Bearer " + GALLERY_KEY
        },
    }))

    const imageBlob = await imageResponse.blob()
    const imageURL = URL.createObjectURL(imageBlob)

    const image = document.createElement("img")
    image.src = imageURL
    const interval = setInterval(() => {
        if (nextIndex == index) {
            images.push(image)
            $("#gallery > div").appendChild(image)
            clearInterval(interval)
            nextIndex++
        }
    });
});

await new Promise(res => {
    let interval = setInterval(() => {
        if (nextIndex >= Math.min(7, entriesFiltered.length)) {
            clearInterval(interval)
            res()
        }
    });
})

$$(".gallery-placeholder").forEach(placeholder => {
    placeholder.remove()
})

// images.forEach((image)=>{
//     $("#gallery > div").appendChild(image)
// })

// let msnry = new Masonry('#gallery > div', {
//     // options
//     itemSelector: '#gallery > div > img',
//     columnWidth: 70,
//     fitWidth: true,
//     gutter: 10,
//     horizontalOrder: true,
// });