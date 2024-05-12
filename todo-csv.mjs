import { readFileSync, writeFileSync, appendFileSync, appendFile } from 'node:fs'
import { exit } from 'node:process'

export function selectTask(id) {
    let task
    let tasks = getTasks()
    task = tasks.find(task => {
        let values = task.split(',')
        return values[0] === id
    })
    if (task === undefined){
        console.error(`La tarea no existe con el id ${id}`)
        exit(1)
    }

    return task
}


export function deleteTask(id){
    let task = selectTask(id)
    let tasks = getTasks()
    let i = tasks.indexOf(task)
    if(i !== -1){
        tasks.splice(i, 1)
    }

    
    console.log(`Tarea: ${task} eliminada`)
    writeFileSync('./Recursos/To-do-list-db.csv', tasks.join('\n'),{
        'encoding': 'utf8'
    })
}
export function newTask(name, dueDate, label){
    let tasks = getTasks()
    let lastTaskId = tasks.pop().split(',')[0]
    appendFileSync('./Recursos/To-do-list-db.csv',
        `\n${Number(lastTaskId) + 1},${name},${dueDate},todo,${label}`
    , {
        'encoding': 'utf8'
    })

}

export function markTaskAsDone(id){
    let task = selectTask(id)
    let values = task.split(',')
    let tasks = getTasks()
    let i = tasks.indexOf(task)
    if (values[3] === 'todo'){
        values[3] = 'done'
    }
    tasks[i] = values.join(',')
    writeFileSync('./Recursos/To-do-list-db.csv', tasks.join('\n'),{
        'encoding': 'utf8'
    })
}


export function getTasks(filter = 'all'){
    let filtersKeywords = ['todo', 'done']
    let content = readFileSync('./Recursos/To-do-list-db.csv', {
        'encoding': 'utf8'
    })
    let tasks = content.split('\n')
    if (filter === 'all') {
        return tasks
    }
    
    if (filtersKeywords.includes(filter)) {
        let filteredTasks = tasks.filter(task => {
            let values = task.split(',')
            
            return values[3] === filter 
        })

        return filteredTasks
    }

    console.error(`Error. No se reconoce el filtro ${filter}`)
}
