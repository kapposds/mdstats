import os from 'os'
import childProcess from 'child_process'

class StatisticsService {
	/**
	* Returns info about the MongoDB process
	* 
	* @param {string} name - The title of the book.
	*
	* @return {Object} processInfo
	*/
	processInfo (name) {
		if (os.type() === 'Windows_NT') {
			return new Promise((resolve, reject) => {
				return resolve({
					rMemory: 15,
		    		vMemory: 18,
		    		cpu: 5.3,
		    		process: 'mongod'
				})
			})
		} else {
			return new Promise((resolve, reject) => {
				childProcess.exec('ps -A -o rss,vsz,pcpu,comm', function (err, result) {
					if (err) return reject(err)
			    	const mongoDBProcess = result.split('\n').filter(x => new RegExp(name).test(x))
			    	if (!mongoDBProcess.length) return reject(new Error('No mongoDB instance found'))
			    	const splittedData = mongoDBProcess[0].split(' ')
			    	return resolve({
			    		rMemory: parseInt(splittedData[0]) / 1000,
			    		vMemory: parseInt(splittedData[1]) / 1000,
			    		cpu: parseFloat(splittedData[3]),
			    		process: splittedData[4]
			    	})
				})
			}) 
		}
	}
}

export default StatisticsService
