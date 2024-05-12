import { readFile } from 'node:fs/promises'
import process, { exit } from 'node:process'
import { deleteTask, getTasks, markTaskAsDone, newTask } from './todo-json.mjs'
import { normalizeParams, validateId } from './utils.mjs'

let action = process.argv[2]
let params = process.argv.slice(3)

switch (action) {
    case '--new': {
        params = normalizeParams(params)
        newTask(params[0], params[1], params[2])
        break
    }
    case '--delete': {
        validateId(params[0])
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
        validateId(params[0])
        markTaskAsDone(params[0])
        break
    }
    default: {
        console.error(`Error. ${action} no es valido`)
        break
    }
}

