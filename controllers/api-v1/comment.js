const express = require('express')
const router = express.Router()
const db = require('../../models')

// POST route to add comment
router.post('/',async(req,res)=>{
    
    try{
        console.log('in comments post')
        console.log(req.body)
        const memory = await db.Memory.findById({
            _id : req.body.id
        })
        const newComment = req.body
        memory.comment.push(newComment)
        await memory.save()

        return res.json({memory})
    }catch(err){
        console.log(err)
        res.status(500).json({msg:' server error '})
    }
})

// PUT route to update comments
router.put('/:id',async (req,res)=>{
    console.log('in comments put')
    console.log(req.body)
    try{
        console.log('in put for comments')
        const memories = await db.Memory.findById({
            _id :req.body.id
        })
        
        const pointedComment = memories.comment.find(comment=>{
            
            if (comment._id == req.params.id){
                return comment
            }
        })
        pointedComment.note = req.body.note
        memories.save()
        res.json({memories})
    }catch(err){
        console.log(err)
        res.status(500).json({ msg:' server error '})
    }
})

// DELETE route to remove comments
router.delete('/:id',async (req,res)=>{
    console.log('in comments put')
    console.log(req.params)
    console.log(req.body)
    try{
        const memories = await db.Memory.findById({
            _id: req.body.id
        })

        const pointedComment = memories.comment.findIndex(({_id})=> _id==req.params.id)

        memories.comment.splice(pointedComment,1)
        memories.save()
        res.json(memories)
    }catch(err){
        console.log(err)
        res.status(500).json({ msg: ' server error '})
    }
})
module.exports= router