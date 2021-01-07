const buildResponse = (error, result) => {
    return {
        error,
        result
    }
}

module.exports = { buildResponse }