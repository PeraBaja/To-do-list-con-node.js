import { readFileSync, writeFileSync } from 'node:fs'
import { STATUS } from './status-enum.mjs'

export function selectTask(id) {

    let tasks = getTasks()
    const task = tasks.find(task => task.id == id)

    if (task === undefined) {
        console.error(`La tarea no existe con el id ${id}`)
        process.exit(1)
    }

    return task
}

export function deleteT(task) {
    let tasks = getTasks()
    tasks = tasks.filter(t => t.id !== task.id)
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


export function update(task, name) {
    let tasks = getTasks()
    tasks.find(t => task.id === t.id)
        .name = name

    save(tasks)
}

export function markAs(task, status) {
    let tasks = getTasks()
    tasks.find(t => task.id === t.id)
        .status = status

    save(tasks)
}
function save(tasks){
    const formatedTasks = JSON.stringify(tasks, null, '\t')
    writeFileSync('./Recursos/Todo-list.json', formatedTasks, {
        'encoding': 'utf8'
    })
}


export function getTasks(filter = 'all') {
    const filtersKeywords = Object.values(STATUS)
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

    console.error(`Error. No se reconoce el filtro "${filter}"`)
    process.exit(1)
}
export function show(tasks){
    console.log('ID | Nombre | Fecha de Vencimiento | Etiqueta | Estado')
    for (const task of tasks){
        console.log(`${task.id} | ${task.name} | ${task.dueDate} | ${task.label} | ${task.status}`)
    }

}
