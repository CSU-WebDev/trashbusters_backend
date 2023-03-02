const mongoose = require('mongoose')

const pinSchema = new mongoose.Schema({
    lat: {
        required: true,
        type: Number
    },
    lng: {
        required: true,
        type: Number
    },
    desc: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('PinDatas', pinSchema)