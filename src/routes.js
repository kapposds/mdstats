import express from 'express'
import moment from 'moment'
import StatisticsService from './Services/StatisticsService'

const router = express.Router()

const StatisticsServiceInstance = new StatisticsService()

router.get('/ping',function (req, res) {
    res.json({
    	serverStatus: 'green',
    	mongoDBStatus: 'green'
    })
})

router.get('/config',function (req, res) {
    return res.json({
        cpu: {
            green: 0.6,
            yellow: 0.8
        },
        memory: {
            green: 150000,
            yellow: 250000
        }
    })
})

router.get('/cpu',function (req, res) {
	return StatisticsServiceInstance.getProcessInfo()
	.then(info => {
		return res.json([{
    		status: 'green',
    		value: info.cpu,
    		eventDate: moment().toDate()
    	}, {
            status: 'green',
            value: info.cpu,
            eventDate: moment().add(1, 'd').toDate()
        }, {
            status: 'green',
            value: info.cpu,
            eventDate: moment().add(2, 'd').toDate()
        }])
	})
})

router.get('/memory',function (req, res) {
	return StatisticsServiceInstance.getProcessInfo()
	.then(info => {
		return res.json([{
            status: 'green',
            value: info.memory,
            eventDate: moment().toDate()
        }, {
            status: 'green',
            value: info.memory,
            eventDate: moment().add(1, 'd').toDate()
        }, {
            status: 'green',
            value: info.memory,
            eventDate: moment().add(2, 'd').toDate()
        }])
	})
})

export default router
