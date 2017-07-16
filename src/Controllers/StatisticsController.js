import moment from 'moment'

import StatisticsService from '../Services/StatisticsService'

class StatisticsController {

	constructor() {
		this.statisticsService = new StatisticsService()
	}

	getCPU() {
		return this.statisticsService.processInfo('mongod')
		.then(info => {
			return {
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
	        }
		})
	}

	getMemory() {
		return this.statisticsService.processInfo('mongod')
		.then(info => {
			return {
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
	        }
		})
	}
}

export default new StatisticsController()