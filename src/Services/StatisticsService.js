import os from 'os'
import childProcess from 'child_process'

class StatisticsService {
	getProcessInfo () {
		if (os.platform() === 'win32') {
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
			    	const mongoDBProcess = result.split('\n').filter(x => /mongod/.test(x))
			    	if (!mongoDBProcess.length) return reject(new Error('No mongoDB instance found'))
			    	const splittedData = mongoDBProcess[0].split(' ')
			    	return resolve({
			    		rMemory: splittedData[0],
			    		vMemory: splittedData[1],
			    		cpu: splittedData[3],
			    		process: splittedData[4]
			    	})
				})
			}) 
		}
	}
}

export default StatisticsService
