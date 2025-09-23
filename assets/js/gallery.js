import { $, $$ } from './utils.js'

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
    const imageResponse = (await fetch("https://content.dropboxapi.com/2/files/get_thumbnail_v2", {
        method: "POST",
        headers: {
            "Dropbox-API-Arg": JSON.stringify({
                    "format": "jpeg",
                    "mode": "strict",
                    "quality": "quality_80",
                    "resource": {
                        ".tag": "path",
                        "path": imageData.id
                    },
                    "size": "w1024h768"
                }),
            "Authorization": "Bearer " + GALLERY_KEY
        },
    }))

    let imageBlob = await imageResponse.blob()
    imageBlob = imageBlob.slice(0, imageBlob.size, "image/jpeg")
    const imageURL = URL.createObjectURL(imageBlob)

    const preload = new Image()
    preload.src = imageURL

    const image = document.createElement("img")
    image.src = imageURL
    const interval = setInterval(() => {
        if (nextIndex == index) {
            images.push(image)
            $("#gallery").appendChild(image)
            clearInterval(interval)
            nextIndex++
        }
    });
});