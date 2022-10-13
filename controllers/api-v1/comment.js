const express = require('express')
const router = express.Router()
const db = require('../../models')

// POST route to add comment

router.post('/:id',async(req,res)=>{
    console.log(req.body)
    try{
        console.log('in comments post')
        console.log(req.body)
        const memory = await db.Memory.findById({
            _id : req.params.id
        })
        const newComment = req.body
        console.log(memory)
        console.log(newComment)
        memory.comments.push(newComment)
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
router.delete('/:id/:cid',async (req,res)=>{
    console.log('in comments put')
    console.log(req.params)
    console.log(req.body)
    try{
        const memories = await db.Memory.findById({
            _id: req.params.id
        })

        console.log(memories)
        const pointedComment = memories.comments.findIndex(({_id})=> _id==req.params.cid)

        memories.comments.splice(pointedComment,1)
        await memories.save()
        res.json(memories)
    }catch(err){
        console.log(err)
        res.status(500).json({ msg: ' server error '})
    }
})
module.exports= router