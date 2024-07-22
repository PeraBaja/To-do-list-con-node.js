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
    let lastTaskId = tasks[tasks.length - 1].id

    let newTask = {
        "id": Number(lastTaskId) + 1,
        "name": name || '',
        "dueDate": dueDate || '',
        "label": label || ''
    }
    tasks.push(newTask)
    let formatedTasks = JSON.stringify(tasks, null, '\t')
    writeFileSync('./Recursos/Todo-list.json', formatedTasks, { 'encoding': 'utf8' })
}

export function markTaskAsDone(id) {
    let task = selectTask(id)
    let values = task.split(',')
    let tasks = getTasks()
    let i = tasks.indexOf(task)
    if (values[3] === 'todo') {
        values[3] = 'done'
    }
    tasks[i] = values.join(',')
    writeFileSync('./Recursos/Todo-list.json', tasks.join('\n'), {
        'encoding': 'utf8'
    })
}


export function getTasks(filter = 'all') {
    let filtersKeywords = ['todo', 'done']
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

    console.error(`Error. No se reconoce el filtro ${filter}`)
}
