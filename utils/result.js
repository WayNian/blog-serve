const result = (code = 0, msg = '', data = {}) => {
    return {
        code,
        msg,
        data
    }
}

module.exports = { result }