const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
    url:{
        type:String
    }
},{timestamps:true})

const MemorySchema = mongoose.Schema({
    title:{
        type: String
    },
    note:{
        type:String
    },
    image:{
        type:[imageSchema]
    },
    UserId:{
        type:String
    },
    favorite:{
        type:Boolean
    }
},{timestamps:true})

module.exports = mongoose.model('Memory',MemorySchema)