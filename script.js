const nameTask = document.getElementById("name-task");
const buttonCreate = document.getElementById("button-create");
const tasksElement = document.getElementById('tasks');
const tasks = [];

function save(){
    const data = JSON.stringify(tasks)
    localStorage.setItem('tasks', data);
}

function load(){
    const data = localStorage.getItem('tasks');
    if(data){
        const list = JSON.parse(data);
        list.forEach(task => {
            tasks.push(task)
        });
    }
}

function add(task){
    // hashmap, dict, map, object.
    const item = {
        "task": task , // objeto com chave e valor 
        "check": false
    }
    tasks.push(item)
    save()
    refreshPage()
}

function toggle(index){
    const task = tasks[index]
    task["check"] = !task["check"]
    save()
    refreshPage()
}

function remove(index){
    tasks.splice(index, 1)
    save()
    refreshPage()
}

function refreshPage(){
    tasksElement.innerHTML = '';

    for(let i = 0;i < tasks.length; i++){
        const task = tasks[i];

        const div = document.createElement('div');
        div.classList.add('task');

        const p = document.createElement('p');
        p.classList.add('task-title');
        p.textContent = task['task'];
        div.appendChild(p);

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.classList.add('check');
        input.name = 'task-check';
        input.checked = task["check"]
        input.addEventListener('click', () => { toggle(i) });
        div.appendChild(input);

        const button = document.createElement('button');
        button.textContent = 'X'
        button.classList.add('task-remove');
        button.addEventListener('click', () => { remove(i) });
        div.appendChild(button);

        tasksElement.appendChild(div);
    }
}

buttonCreate.addEventListener('click', () =>{
    const task = nameTask.value;
    add(task)
    nameTask.value = '';
});

load();
refreshPage()