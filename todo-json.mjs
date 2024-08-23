import { readFileSync, writeFileSync, appendFileSync, appendFile } from 'node:fs'
import { exit } from 'node:process'

export function selectTask(id) {
    let task
    let tasks = getTasks()
    task = tasks.find(task => task.id == id)
    if (task === undefined) {
        console.error(`La tarea no existe con el id ${id}`)
        exit(1)
    }

    return task
}

export function deleteTask(id) {
    let deletedTask
    let tasks = getTasks()
    let i = tasks.findIndex(task => task.id == id)
    if (i === -1) {
        console.error('La tarea no existe')
        exit(1)
    }
    deletedTask = tasks.splice(i, 1)[0]
    let formatedTasks = JSON.stringify(tasks, null, '\t')
    console.log(`Tarea: ${deletedTask.name} eliminada`)
    writeFileSync('./Recursos/Todo-list.json', formatedTasks, {
        'encoding': 'utf8'
    })
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
        "label": label || ''
    }
    tasks.push(newTask)
    const formatedTasks = JSON.stringify(tasks, null, '\t')
    writeFileSync('./Recursos/Todo-list.json', formatedTasks, { 'encoding': 'utf8' })
}

export function markTaskAs(id, status) {
    const task = selectTask(id)
    const tasks = getTasks()
    task.status = status
    tasks[id] = task

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
