import Promise from 'bluebird'
import find from 'find-process'
import pusage from 'pidusage'

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
	 * @property {string} process The name of the process
	 * @property {number} memory The amount of memory that the process uses in MB
	 * @property {number} cpu The percentage of the cpu that the process uses
	*/
	processInfo (name) {
		return find('name', name)
		.then((list) => {
			if (!list.length) return Promise.reject(new Error('No mongoDB instance found'))
			const pid = list[0].pid
			return new Promise((resolve, reject) => {
				pusage.stat(pid, (err, stat) => {
					if(err) return reject(err)
					return resolve({
						process: 'mongod',
						memory: stat.memory / 1000000,
						cpu: stat.cpu,
					})
				})
			})
		})
	}
}

export default StatisticsService
