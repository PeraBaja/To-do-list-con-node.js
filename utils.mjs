export function normalizeParams(params) {
    params = params.map(param => param !== undefined ? param : '')
    return params
}

export function validateId(value){
    try 
    {
        value = Number(value)
        if (!Number.isInteger(value)) throw new Error;
    }
    catch
    {
        console.error('Error id erronea')
        process.exit(1)
    }
}