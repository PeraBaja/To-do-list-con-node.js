import { readFileSync, writeFileSync, appendFileSync, appendFile } from 'node:fs'

export function selectTask(id) {

    let tasks = getTasks()
    const task = tasks.find(task => task.id == id)

    if (task === undefined) {
        console.error(`La tarea no existe con el id ${id}`)
        process.exit(1)
    }

    return task
}

export function deleteTask(id) {
    const selected_task = selectTask(id)
    let tasks = getTasks()

    tasks = tasks.filter(task => task.id !== selected_task.id)

    let formatedTasks = JSON.stringify(tasks, null, '\t')
    console.log(`Tarea: ${selected_task.name} eliminada`)
    save(tasks)
}

export function newTask(name, dueDate, label) {
    let tasks = getTasks()
    let lastTaskId

    if (tasks.length > 0) lastTaskId = tasks[tasks.length - 1].id
    else lastTaskId = 0

    let newTask = {
        "id": Number(lastTaskId) + 1,
        "name": name || '',
        "dueDate": dueDate || '',
        "label": label || '',
        "status": 'todo'
    }
    tasks.push(newTask)
    save(tasks)
}


export function update(id, name) {
    const selected_task = selectTask(id)
    let tasks = getTasks()
    selected_task.name = name
    tasks = tasks.map(task => {
        if (task.id !== selected_task.id) return task
        return selected_task
    })

    save(tasks)
}

export function markTaskAs(id, status) {
    const selected_task = selectTask(id)
    let tasks = getTasks()
    selected_task.status = status
    tasks = tasks.map(task => {
        if (task.id !== selected_task.id) return task
        return selected_task
    })
    save(tasks)
}
function save(tasks){
    const formatedTasks = JSON.stringify(tasks, null, '\t')
    writeFileSync('./Recursos/Todo-list.json', formatedTasks, {
        'encoding': 'utf8'
    })
}


export function getTasks(filter = 'all') {
    const filtersKeywords = ['todo', 'done', 'in-progress']
    let content = readFileSync('./Recursos/Todo-list.json', {
        'encoding': 'utf8'
    })
    let tasks = JSON.parse(content)

    if (filter === 'all') {
        return tasks
    }

    if (filtersKeywords.includes(filter)) {
        let filteredTasks = tasks.filter(task => task.status === filter)
        return filteredTasks
    }

    //Si el filtro no es correcto

    console.error(`Error. No se reconoce el filtro ${filter}`)
}
