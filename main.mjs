import { readFile } from 'node:fs/promises'
import process, { exit } from 'node:process'
import { deleteTask, getTasks, markTaskAsDone, newTask } from './todo-csv.mjs'
import { normalize } from 'node:path'

let action = process.argv[2]
let params = process.argv.slice(3)

switch (action) {
    case '--new': {
        params = normalizeParams(params)
        newTask(params[0], params[1], params[2])
        break
    }
    case '--delete': {
        validateId()
        deleteTask(params[0])
        break
    }
    case '--list': {
        if (params[0] === undefined){
            console.log(getTasks())
        }
        else {
            console.log(getTasks(params[0]))
        }
        break
    }
    case '--done': {
        validateId()
        markTaskAsDone(params[0])
        break
    }
    default: {
        console.error(`Error. ${action} no es valido`)
        break
    }
}

function normalizeParams(params) {
    params.map(param => {
        if (param === undefined) {
            return ''
        }
        return param
    })
    return params
}

function validateId(){
    if (Number.isInteger(params[0])) {
        console.error('Error id erronea')
        exit(1)
    }
}