const router = require('express').Router()
const db = require('../../models')
const authLockedRoute = require('./authLockedRoute')
require('dotenv').config()
const path = require('path')
const { unlinkSync } = require('fs')
const multer = require('multer')
const cloudinary = require('cloudinary').v2

const uploads = multer({ dest: 'uploads/' })

router.get('/', authLockedRoute, async (req, res) => {
    try {
        const currentUser = await db.User.findById(res.locals.user._id).populate({
            path: "memories"
        })
        res.json(currentUser.memories)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'server error'  })
    }
})

router.post('/', authLockedRoute, uploads.array('images', 20), async (req, res) => {
    try {
        const newMemory = await db.Memory.create(req.body)
        for (const file of req.files) {
            const cloudImageData = await cloudinary.uploader.upload(file.path)
            newMemory.images.push({
                url: cloudImageData.url,
                publicId: cloudImageData.public_id
            })
            await newMemory.save()
            unlinkSync(file.path)
        }
        res.locals.user.memories.push(newMemory)
        newMemory.userId = res.locals.user
        await newMemory.save()
        await res.locals.user.save()
        res.status(201).json(newMemory)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'server error'  })
    }
})

router.get('/:id', authLockedRoute, async (req, res) => {
    try {
        const foundMemory = await db.Memory.findById(req.params.id).populate({ path: 'userId' })
        res.json(foundMemory)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'server error'  })
    }
})

router.put('/:id', authLockedRoute, uploads.array('images', 20), async (req, res) => {
    try {
        const options = {
            new: true
        }
        const foundMemory = await db.Memory.findByIdAndUpdate(req.params.id, req.body, options)
        for (const file of req.files) {
            const cloudImageData = await cloudinary.uploader.upload(file.path)
            foundMemory.images.push({
                url: cloudImageData.url,
                publicId: cloudImageData.public_id
            })
            await foundMemory.save()
            unlinkSync(file.path)
        }
        res.json(foundMemory)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'server error'  })
    }
})

router.delete('/:id', authLockedRoute, async (req, res) => {
    try {
        const foundMemory = await db.Memory.findById(req.params.id)
        for (const image of foundMemory.images) {
            await cloudinary.uploader.destroy(image.publicId)
        }
        await db.Memory.deleteOne(foundMemory)
        res.sendStatus(204)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'server error'  })
    }
})

router.use('/comment', require('./comment'))

module.exports = router