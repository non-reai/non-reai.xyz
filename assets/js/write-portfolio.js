const converter = new showdown.Converter()

const simplemde = new SimpleMDE({
    previewRender: (plaintext)=>{
        let finalString = `
        <h1 style="margin-bottom: 10px; margin-top: 10px;">${document.getElementById('title').value}</h1>
        <h5 style="margin-top: 0; color: rgba(0,0,0,0.3);">${new Date().toLocaleString()}</h5>
        `
        return finalString + converter.makeHtml(plaintext.replaceAll("\n", '</br>'))
    },
    autosave: {
        enabled: true,
        delay: 100,
        uniqueId: "skibidi"
    }
});

document.querySelector('#post').addEventListener('click', async ()=>{
    const response = await fetch('/portfolio/write', {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'authorization': 'ohtheweatheroutsideisrizzy'
        },
        body: JSON.stringify({
            title: document.getElementById('title').value,
            path: document.getElementById('path').value,
            content: simplemde.value()
        })
    })

    if (response.status == 200) {
        window.location.pathname = "/portfolio"
    } else {
        alert(response.statusText)
    }
})