export function normalizeParams(params) {
    params = params.map(param => {
        if (param === undefined) {
            return ''
        }
        return param
    })
    return params
}

export function validateId(id){
    if (Number.isInteger(id)) {
        console.error('Error id erronea')
        exit(1)
    }
}