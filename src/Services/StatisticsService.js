import Promise from 'bluebird'
import os from 'os'
import childProcess from 'child_process'

/**
 * Class responsible for retrieving and storing info about the mongoDB statistics
 */
class StatisticsService {
	/**
	 * Returns info about the given process
	 * 
	 * @param {string} name - The name of the process to look for
	 *
	 * @return {Object} processInfo Info that are associated with the process that was passed as an argument to the function
	 * @property {number} process The name of the process
	 * @property {number} rMemory The resident memory that the process uses expressed in MB
	 * @property {number} vMemory The virtual memory that the process uses expressed in MB
	 * @property {number} cpu The percentage of the cpu that the process uses
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
			    		process: splittedData[4],
			    		rMemory: parseInt(splittedData[0]) / 1000,
			    		vMemory: parseInt(splittedData[1]) / 1000,
			    		cpu: parseFloat(splittedData[3])
			    	})
				})
			}) 
		}
	}
}

export default StatisticsService
