const router = require('express').Router()
const db = require('../../models')
const jwt = require('jsonwebtoken')
const authLockedRoute = require('./authLockedRoute')

router.get('/', authLockedRoute, async (req, res) => {
    try {
        const currentUser = res.locals.user.populate({
            path: 'memories',
            populate: {
                path: 'user'
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'server error'  })
    }
})

router.post('/', authLockedRoute, async (req, res) => {
    try {
        const newMemory = db.Memory.create(req.body)
        res.locals.user.memories.push(newMemory)
        newMemory.user = res.locals.user
        await newMemory.save()
        await res.locals.user.save()
        res.status(204).json(newMemory)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'server error'  })
    }
})

router.put('/:id', authLockedRoute, async (req, res) => {
    try {
        const foundMemory = await db.Memory.findByIdAndUpdate(req.params.id, req.body)
        res.json(foundMemory)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'server error'  })
    }
})

module.exports = router