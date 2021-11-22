const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const tuneSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    track:{
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    description: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Tune",tuneSchema);