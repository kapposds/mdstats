import express from 'express'
const router = express.Router()

router.get('/ping',function (req, res) {
    res.json({
    	serverStatus: 'green',
    	mongoDBStatus: 'green',

    })
})

router.get('/cpu',function (req, res) {
    res.json({
    	status: 'green',
    	value: Math.random() * (100 - 1) + 1
    	
    })
})

export default router
