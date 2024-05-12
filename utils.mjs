export function normalizeParams(params) {
    params.map(param => {
        if (param === undefined) {
            return ''
        }
        return param
    })
    return params
}

export function validateId(){
    if (Number.isInteger(params[0])) {
        console.error('Error id erronea')
        exit(1)
    }
}