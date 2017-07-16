import express from 'express'

import StatisticsController from './Controllers/StatisticsController'
import ConfigService from './Services/ConfigService'

const router = express.Router()

const ConfigServiceInstance = new ConfigService()

router.get('/ping',function (req, res) {
    return res.json({
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
	return StatisticsController.getCPU()
	.then(info => res.json(info))
    .catch(err => res.status(500).json({error: err.message}))
})

router.get('/memory',function (req, res) {
	return StatisticsController.getMemory()
    .then(info => res.json(info))
    .catch(err => res.status(500).json({error: err.message}))
})

export default router
