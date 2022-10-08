const router = require('express').Router()
const db = require('../../models')
const authLockedRoute = require('./authLockedRoute')

router.get('/', authLockedRoute, async (req, res) => {
    try {
        const currentUser = res.locals.user.populate({
            path: 'memories',
            populate: {
                path: 'user'
            }
        })
        res.json(currentUser.memories)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'server error'  })
    }
})

router.post('/', authLockedRoute, async (req, res) => {
    try {
        const newMemory = await db.Memory.create(req.body)
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

router.use('/:id/comment', require('./comment'))

module.exports = router