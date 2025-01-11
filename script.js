import {getData, postData, deleteData, updateData} from './modules/db-manager.js';
let username = document.getElementById('username');
let age = document.getElementById('age');
let comments = document.getElementById('comments');
let id = null;
let submit = document.getElementById('submit');
const users = document.querySelector('.users');
const panelButtons = document.querySelectorAll('.panel>button');
const cont = document.querySelector('.left');
let mode = 'Add';
async function getNewId() {
    const data = await getData('http://localhost:3000/users');
    const ids = data.map(user => user.id);
    if (ids.length != 0) {
        return (Math.max(...ids) + 1).toString();
    } else {
        return (0).toString();
    }
}
window.addEventListener('load', async () => {
    const data = await getData('http://localhost:3000/users');
    data.forEach(user => {
        const li = document.createElement('li');
        li.classList.add('mini-cont');
        li.innerHTML = `<h3 class="otherLi"></h3><div class="scroll-ul"><ul class="commentsLi mini-cont"></ul></div>`;
        users.appendChild(li);
        li.children[0].innerText = `${user.username}, ${user.age}, ${user.id}`;
        user.comments.forEach(comment => {
            const div = li.children[1].children[0];
            const commentEl = document.createElement('li');
            div.appendChild(commentEl);
            commentEl.innerText = comment;
        });
    });
});
function reSubmit() {
    submit.onclick = async (e) => {
        e.preventDefault();
        switch (mode) {
            case 'Add':
                console.log('add');
                await postData('http://localhost:3000/users', {
                    id: await getNewId(),
                    username: username.value,
                    age: +age.value,
                    comments: comments.value.split(' ')
                });
                window.location.reload();
                break;
            case 'Remove':
                await deleteData('http://localhost:3000/users', id.value);
                window.location.reload();
                break;
            case 'Edit':
                await updateData('http://localhost:3000/users', id.value, {
                    username: username.value,
                    age: +age.value,
                    comments: comments.value.split(' ')
                });
                // window.location.reload();
                break;
        }
    }
}
reSubmit();
panelButtons[0].addEventListener('click', () => {
    cont.innerHTML = `<form class="cont form" action="#">
    <h1>New member</h1>
    <input type="text" placeholder="Username" id="username">
    <input type="number" placeholder="Age" id="age">
    <input type="text" placeholder="Comments" id="comments">
    <div class="comments mini-cont"></div>
    <button id="submit">Submit</button>
</form>`;
    username = document.getElementById('username');
    age = document.getElementById('age');
    comments = document.getElementById('comments');
    submit = document.getElementById('submit');
    mode = 'Add';
    reSubmit();
});
panelButtons[1].addEventListener('click', () => {
    cont.innerHTML = `<form class="cont form" action="#">
    <h1>Remove member</h1>
    <input type="number" placeholder="ID" id="id">
    <button id="submit">Submit</button>
</form>`;
    submit = document.getElementById('submit');
    id = document.getElementById('id');
    mode = 'Remove';
    reSubmit();
});
panelButtons[2].addEventListener('click', () => {
    cont.innerHTML = `<form class="cont form" action="#">
    <h1>Edit member</h1>
    <input type="number" placeholder="ID" id="id">
    <input type="text" placeholder="Username" id="username">
    <input type="number" placeholder="Age" id="age">
    <input type="text" placeholder="Comments" id="comments">
    <div class="comments mini-cont"></div>
    <button id="submit">Submit</button>
</form>`;
    id = document.getElementById('id');
    username = document.getElementById('username');
    age = document.getElementById('age');
    comments = document.getElementById('comments');
    submit = document.getElementById('submit');
    mode = 'Edit';
    reSubmit();
});