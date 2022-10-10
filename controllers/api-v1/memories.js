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
        const currentUser = res.locals.user.populate({
            path: 'memories'
        })
        res.json(currentUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'server error'  })
    }
})

router.post('/', uploads.array('images', 20), async (req, res) => {
    try {
        const newMemory = await db.Memory.create(req.body)
        // res.locals.user.memories.push(newMemory)
        await req.files.forEach(file => {
            console.log('file', file)
            cloudinary.uploader.upload(file.path)
                .then(cloudImageData => {
                    console.log('upload', cloudImageData)
                    newMemory.images.push(cloudImageData.url)
                    unlinkSync(file.path)
                })
                .catch (error => {
                    console.log(error)
                    res.status(500).json({ msg: 'server error'  })
                })
        })
        // newMemory.userId = res.locals.user
        await newMemory.save()
        // await res.locals.user.save()
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

router.put('/:id', authLockedRoute, async (req, res) => {
    try {
        const options = {
            new: true
        }
        const foundMemory = await db.Memory.findByIdAndUpdate(req.params.id, req.body, options)
        res.json(foundMemory)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'server error'  })
    }
})

router.delete('/:id', authLockedRoute, async (req, res) => {
    try {
        await db.Memory.findByIdAndDelete(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'server error'  })
    }
})

// router.use('/:id/comment', require('./comment'))

module.exports = router