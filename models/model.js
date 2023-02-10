const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema( {
    location: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    severity: {
        required: true,
        type: Number
    }
})
// const dataSchema = new mongoose.Schema({
//     name: {
//         required: true,
//         type: String
//     },
//     age: {
//         required: true,
//         type: Number
//     }
// })

module.exports = mongoose.model('Data', dataSchema)