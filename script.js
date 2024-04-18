const nameTask = document.getElementById("name-task");
const buttonCreate = document.getElementById("button-create");

const tasksElement = document.getElementById('tasks');
const tasks = [];

function add(task){
    // hashmap, dict, map, object.
    const item = {
        "task": task , // objeto com chave e valor 
        "check": false
    }
    tasks.push(item)
    refreshPage()
}

function toggle(index){
    const task = tasks[index]
    task["check"] = !task["check"]
    refreshPage()
}

function remove(index){
    tasks.splice(index, 1)
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
} )

refreshPage()