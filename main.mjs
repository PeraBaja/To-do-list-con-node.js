import { readFile } from 'node:fs/promises'
import process, { exit } from 'node:process'
import { deleteTask, getTasks, markTaskAsDone, newTask } from './todo-json.mjs'
import { normalizeParams, validateId } from './utils.mjs'

let action = process.argv[2]
let params = process.argv.slice(3)

switch (action) {
    case 'new': {
        params = normalizeParams(params)
        newTask(params[0], params[1], params[2])
        break
    }
    case 'delete': {
        validateId(params[0])
        deleteTask(params[0])
        break
    }
    case 'list': {
        if (params[0] === undefined) console.log(getTasks())
        else console.log(getTasks(params[0]))
        break
    }
    case 'mark-done': {
        validateId(params[0])
        markTaskAsDone(params[0])
        break
    }
    case 'mark-in-progress': {
        validateId(params[0])
        mark(params[0])
        break
    }
    case 'help' | '-h': {
        console.log(`🎉 Bienvenido/a al todolist de PeraBaja:\n 
            Aquí algunos comandos que puedes intentar: \n
            \t--new [nombre|fechaVencimiento|etiqueta]\n
            \t--list [all|todo|done] lista todas las tareas\n
            \t--done [id] marca la tarea seleccionada con el id como completada\n
            \t--delete [id] elimina la tarea seleccionada con el id\n
            \t--help o --h muestra este mensaje\n
            \t--version muestra la versión de la aplicación\n

            `)
    }

    default: {
        console.error(`Error. ${action} no es valido`)
        break
    }
}

