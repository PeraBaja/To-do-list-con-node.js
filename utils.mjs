export function normalizeParams(params) {
    params = params.map(param => param !== undefined ? param : '')
    return params
}

export function validateId(id){
    if (Number.isInteger(id)) {
        console.error('Error id erronea')
        exit(1)
    }
}