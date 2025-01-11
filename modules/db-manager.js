async function getData(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
}

async function postData(url, data) {
    await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
}

async function deleteData(url, id) {
    await fetch(`${url}/${id}`, {
        method: 'DELETE'
    });
}

async function updateData(url, id, data) {
    await fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
}

export {getData, postData, deleteData, updateData};