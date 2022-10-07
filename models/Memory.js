const mongoose = require('mongoose')


const commentSchema = mongoose.Schema({
    url:{
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
    favorite:{
        type:Boolean
    },
    UserId:{
        type:String
    },
    image:{
        type:[String]
    },
    comment:{
        type:[commentSchema]
    },
    date:{
        type:Date
    }
},{timestamps:true})

module.exports = mongoose.model('Memory',memorySchema)