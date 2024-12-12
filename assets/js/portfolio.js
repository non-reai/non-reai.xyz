function createDropdown(title, node) {
    const dropdown = document.createElement('div')
    dropdown.classList.add('dropdown')
    dropdown.tabIndex = "0"

    const h3 = document.createElement('h3')
    h3.innerText = capitalizeFirstLetterOfEachWord(title.replaceAll('-', ' '))

    const content = document.createElement('div')
    
    dropdown.appendChild(h3)
    dropdown.appendChild(content)
    
    h3.addEventListener('click', ()=>{
        if (dropdown.classList.contains('selecting')) {
            dropdown.classList.remove('selecting')
        } else {
            dropdown.classList.add('selecting')
        }
    })

    node.appendChild(dropdown)

    return {
        dropdown,
        content
    }
}

function capitalizeFirstLetterOfEachWord(sentence) {
    return sentence.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
}

function crawlTree(obj, dropdownParent) {
    Object.keys(obj).forEach(key=>{
        if (typeof(obj[key]) == "object") {
            const dropdown = createDropdown(key, dropdownParent.content)
            crawlTree(obj[key], dropdown)
        } else {
            const anchor = document.createElement('a')
            anchor.innerText = capitalizeFirstLetterOfEachWord(key.replaceAll('.json', '').replaceAll('-', ' '))
            anchor.classList.add('dropdown-content')
            anchor.href = '/'+obj[key].replaceAll('.json', '')
            dropdownParent.content.appendChild(anchor)
        }
    })
}

crawlTree(tree, {dropdown: document.getElementById('projects'), content: document.getElementById('projects')})