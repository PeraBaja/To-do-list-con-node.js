export function normalizeParams(params) {
    params = params.map(param => param !== undefined ? param : '')
    return params
}

export function validateId(id){
    try 
    {
        id = Number(id)
        if (!Number.isInteger(id)) throw new Error;
    }
    catch
    {
        console.error('Error id erronea')
        process.exit(1)
    }
}