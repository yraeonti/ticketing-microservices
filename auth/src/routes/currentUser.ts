import express from 'express'
import { currentUser } from '../../middlewares/currentUser'

const router = express.Router()

router.get('/api/users/currentuser', currentUser, (req, res) => {
    res.send({currentUser: req.currentUSer || null})
})


export {router as currentUserRouter}