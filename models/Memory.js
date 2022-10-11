const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
    url: {
        type: String
    },
    publicId: {
        type: String
    }
})

const commentSchema = mongoose.Schema({
    note:{
        type: String
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
        type:[imageSchema]
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