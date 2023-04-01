const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    complete:{
        type: Boolean,
        default: false
    },
    completedAt:{
        type: Date
    }
}, {timestamps: true})

module.exports = mongoose.model('ToDo', todoSchema)