const mongoose = require('mongoose')

const MemorySchema = mongoose.Schema({
    title:{
        type: String
    },
    Note:{
        type:String
    },
    Image:{
        type:String
    },
    UserId:{
        type:String
    },
    Favorite:{
        type:Boolean
    }
},{timestamps:true})

module.exports = mongoose.model('Memory',MemorySchema)