import { deleteT, getTasks, markAs, newTask, update, show, selectTask } from './todo-json.mjs'
import { normalizeParams, validateId} from './utils.mjs'

let action = process.argv[2]
let params = process.argv.slice(3)
let task
if (['delete', 'update', 'mark-done', 'mark-in-progress'].includes(action)){
    validateId(params[0])
    task = selectTask(params[0])
}

switch (action) {
    case 'add': {
        params = normalizeParams(params)
        newTask(params[0], params[1], params[2])
        console.log('Tarea creada con exito!')
        break
    }
    case 'delete': {
        deleteT(task)
        console.log(`Tarea "${task.name}" eliminada con exito!`)
        break
    }
    case 'list': {
        if (params[0] === undefined) show(getTasks())
        else show(getTasks(params[0]))
        break
    }
    case 'update': {
        update(task, params[1])
        console.log('Tarea renombrada con exito!' + `"${task.name}" -> ${params[1]}`)  
        break
    }
    case 'mark-done': {
        markAs(task, 'done')
        console.log('Tarea actualizada a "done"!')
        break
    }
    case 'mark-in-progress': {
        markAs(task, 'in-progress')
        console.log('Tarea actualizada a "in-progress"!')
        break
    }
    case 'help': {
        console.log(`🎉 Bienvenido/a al todolist de PeraBaja:\n 
            Aquí algunos comandos que puedes intentar: \n
            \tadd [nombre|fechaVencimiento|etiqueta]\n
            \tlist [all|todo|done|in-progress] lista todas las tareas\n
            \tmark-done [id] marca la tarea seleccionada con el id como completada\n
            \tmark-in-progress [id] marca la tarea seleccionada con el id como en progreso\n
            \tdelete [id] elimina la tarea seleccionada con el id\n
            
            \thelp, muestra este mensaje.\n
            `)
        break
    }

    default: {
        console.error(`Error. "${action}" no es una accion valida`)
        break
    }
}

