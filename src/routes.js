import express from 'express'
import StatisticsService from './Stats/StatisticsService'

const router = express.Router()

const StatisticsServiceInstance = new StatisticsService()

router.get('/ping',function (req, res) {
    res.json({
    	serverStatus: 'green',
    	mongoDBStatus: 'green'
    })
})

router.get('/cpu',function (req, res) {
	return StatisticsServiceInstance.getProcessInfo()
	.then(info => {
		return res.json({
    		status: 'green',
    		value: info.cpu,
    		eventDate: new Date()
    	})
	})
})

router.get('/memory',function (req, res) {
	return StatisticsServiceInstance.getProcessInfo()
	.then(info => {
		return res.json({
    		status: 'green',
    		value: info.vMemory,
    		eventDate: new Date()
    	})
	})
})

export default router
