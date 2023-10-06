const response = (statusCode, data, message, res) => {
    res.json(statusCode, {
        status: statusCode,
        message: message,
        data: data,
        // pagination: {
        //     prev: "",
        //     next: "",
        //     max: ""
        // }
    })
}

module.exports = response;