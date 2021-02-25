const buildResponse = (error, result) => {
    return {
        error,
        result
    }
}

const isValidRequest = (reqBody, allowedValuesToUpdateArr) => {
    return Object.keys(reqBody).every((value) => {
        return allowedValuesToUpdateArr.includes(value);
    });
}

module.exports = { buildResponse, isValidRequest }