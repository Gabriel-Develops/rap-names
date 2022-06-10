// DELETE - DELETE
document.querySelectorAll('.del').forEach(del => del.addEventListener('click', deleteRapper))

async function deleteRapper(e) {
    const name = e.srcElement.parentElement.children[0].textContent
    const birthName = e.srcElement.parentElement.children[1].textContent
    try {
        const response = await fetch(`/deleteRapper`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                birthName: birthName
            })
        })
        const data = await response.json()

        if (data === 'rapper deleted')
            window.location.reload()
    }
    catch(error) {
        console.error('Error: ', error)
    }
}

// PUT - UPDATE
document.querySelectorAll('.upvote').forEach(upvote => upvote.addEventListener('click', upvoteRapper))

async function upvoteRapper(e) {
    const name = e.srcElement.parentElement.children[0].textContent
    const birthName = e.srcElement.parentElement.children[1].textContent
    const likes = +e.srcElement.parentElement.children[2].textContent
    console.log(name, birthName)
    try {
        const response = await fetch(`/upvote`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                birthName: birthName,
                likes: likes
            })
        })
        const data = await response.json()

        console.log(data)
        if (data === 'success')
            window.location.reload()
    }
    catch(error) {
        console.error('Error: ', error)
    }
}