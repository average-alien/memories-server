const mongoose = require('mongoose')


const commentSchema = mongoose.Schema({
    note:{
        type:String
    },
    userId:{
        type:String
    }
},{timestamps:true})

const memorySchema = mongoose.Schema({
    title:{
        type: String
    },
    note:{
        type:String
    },
    images:{
        type:[String]
    },
    comments:{
        type:[commentSchema]
    },
    date:{
        type:Date
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps:true})

module.exports = mongoose.model('Memory',memorySchema)