import pg from 'pg'
import { error } from 'node:console'

const client = new pg.Client({
    host: 'localhost',
    password: 'Joder123',
    user: 'postgres',
    database: 'postgres'

})
import { exit } from 'node:process'

export function selectTask(id) {
    client.connect().then(
        client.query("SELECT * FROM tasks Where id = $1", [id])
    ).catch(() => {
        console.error(`La tarea no existe con el id ${id}`)
        exit(1)
    })

    return res.row
}

export function deleteTask(id) {
    client.connect().then(
        client.query("SELECT * FROM tasks Where id = $1", [id])
    ).catch(() => {
        console.error(`La tarea no existe con el id ${id}`)
        exit(1)
    })
}
export function newTask(name, dueDate, label) {
    client.connect().then(async () =>
        {
            let query = "INSERT INTO tasks (name, date, status, label) VALUES ($1, $2, $3, $4) RETURNING *"
            const res = await client.query(query, [name, dueDate, 'todo', label])
            console.log('tarea creada:', res.rows[0])
        }
    )
}

//  newTask('primera tarea', '2021-07-24', 'programación')

export function markTaskAsDone(id) {
    client.connect().then(async () =>
        {
            let query = "UPDATE tasks SET status = 'done' WHERE id = $1 RETURNING name"
            const res = await client.query(query, [id])
            console.log('tarea marcada como completa:', res.rows[0].name)
        }
    )
}


export function getTasks(filter = 'all') {
    let filtersKeywords = ['todo', 'done']
    client.connect().then(async () =>
        {
            
            let query = ""
            if (filter === 'all') {
                query = "SELECT * FROM tasks"
                const res = await client.query(query)
            }
            if(filtersKeywords.includes(filter)){
                query = `SELECT * FROM tasks WHERE status = '${filter}' `
            }
            else {
                console.error(`Por favor seleccione un filtro valido`)
                exit(1)
            }
            const res = await client.query(query)
            console.log('tareas:', res.rows)
        }
    )   
}
getTasks('done')