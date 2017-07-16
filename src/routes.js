import express from 'express'
import moment from 'moment'

import StatisticsService from './Services/StatisticsService'
import ConfigService from './Services/ConfigService'

const router = express.Router()

const StatisticsServiceInstance = new StatisticsService()
const ConfigServiceInstance = new ConfigService()

router.get('/ping',function (req, res) {
    res.json({
    	serverStatus: 'green',
    	mongoDBStatus: 'green'
    })
})

router.get('/config',function (req, res) {
    return ConfigServiceInstance.getConfigurations()
    .then(configs => {
        return res.json(configs)
    })
})

router.post('/config',function (req, res) {
    return ConfigServiceInstance.storeConfigurations(req.body)
    .then(() => {
        return res.json({success: true})
    })
})

router.get('/cpu',function (req, res) {
	return StatisticsServiceInstance.processInfo('mongod')
	.then(info => {
		return res.json({
            data: [{
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
            }]
        })
	})
})

router.get('/memory',function (req, res) {
	return StatisticsServiceInstance.processInfo('mongod')
	.then(info => {
		return res.json({
            data: [{
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
            }]
        })
	})
})

export default router
