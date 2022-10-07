const mongoose = require('mongoose')

const MemorySchema = mongoose.Schema({
    title:{
        type: String
    },
    note:{
        type:String
    },
    image:{
        type:String
    },
    UserId:{
        type:String
    },
    favorite:{
        type:Boolean
    }
},{timestamps:true})

module.exports = mongoose.model('Memory',MemorySchema)