const mongoose = require('mongoose')

// const dataSchema = new mongoose.Schema( {
//     location: {
//         required: true,
//         type: String
//     },
//     description: {
//         required: true,
//         type: String
//     },
//     severity: {
//         required: true,
//         type: Number
//     }
// })

const pinSchema = new mongoose.Schema({
    lat: {
        required: true,
        type: Number
    },
    lon: {
        required: true,
        type: Number
    },
    desc: {
        required: true,
        type: String
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

module.exports = mongoose.model('PinDatas', pinSchema)