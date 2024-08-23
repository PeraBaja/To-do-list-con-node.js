import { readFile } from 'node:fs/promises'
import process, { exit } from 'node:process'
import { deleteTask, getTasks, markTaskAs, newTask } from './todo-json.mjs'
import { normalizeParams, validateId } from './utils.mjs'

let action = process.argv[2]
let params = process.argv.slice(3)

switch (action) {
    case 'add': {
        params = normalizeParams(params)
        newTask(params[0], params[1], params[2])
        console.log('Tarea creada con exito!')
        break
    }
    case 'delete': {
        validateId(params[0])
        deleteTask(params[0])
        console.log('Tarea borrada con exito!')
        break
    }
    case 'list': {
        if (params[0] === undefined) console.log(getTasks())
        else console.log(getTasks(params[0]))
        break
    }
    case 'mark-done': {
        validateId(params[0])
        markTaskAs(params[0], 'done')
        console.log('Tarea actualizada a "done"!')
        break
    }
    case 'mark-in-progress': {
        validateId(params[0])
        markTaskAs(params[0], 'in-progress')
        console.log('Tarea actualizada a "in-progress"!')
        break
    }
    case 'help' || '-h': {
        console.log(`🎉 Bienvenido/a al todolist de PeraBaja:\n 
            Aquí algunos comandos que puedes intentar: \n
            \tadd [nombre|fechaVencimiento|etiqueta]\n
            \tlist [all|todo|done|in-progress] lista todas las tareas\n
            \tmark-done [id] marca la tarea seleccionada con el id como completada\n
            \tmark-in-progress [id] marca la tarea seleccionada con el id como en progreso\n
            \tdelete [id] elimina la tarea seleccionada con el id\n
            
            \thelp o -h muestra este mensaje\n
            `)
        break
    }

    default: {
        console.error(`Error. ${action} no es valido`)
        break
    }
}

