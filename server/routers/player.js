import express from 'express'
import auth from '../middleware/auth.js'
import Player from '../models/players.js'
const router = new express.Router()

router.post('/players', async (req, res) => {
    const player = new Player(req.body)

    try {
        await player.save()
        const token = await player.generateAuthToken()
        res.status(201).send({ player, token })
    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/players/login', async (req, res) => {
    try {
        const player = await Player.findByCredentials(req.body.username, req.body.password)
        const token = await player.generateAuthToken()
        res.send({ player, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/players/logout', auth, async (req, res) => {
    try {
        req.player.tokens = req.player.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.player.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/players/logoutAll', auth, async (req, res) => {
    try {
        req.player.tokens = []
        await req.player.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('players/stats', auth, async (req, res) => {
    try {
        
    } catch (e) {
        res.status(500).send()
    }
})