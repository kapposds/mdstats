import express from 'express'
const router = express.Router()

router.get('/ping',function (req, res) {
    res.json({
    	status: 'live'
    })
})

export default router
