const mongoose = require('mongoose')

const Schema = mongoose.Schema

const prioritySchema = new Schema({
    label: {
        type:String,
        required:true
    },
    code: {
        type:String,
        required:true
    },
    color: {
        type:String,
        required:false
    },
}, { timestamps: true })

module.exports = mongoose.model('Priority', prioritySchema)