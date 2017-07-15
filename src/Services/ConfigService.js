import Promise from 'bluebird'
import fs  from 'fs'
Promise.promisifyAll(fs)

const configurations = require('../../config.json')

/**
 * Class responsible for retrieving and storing global configurations
 */
class ConfigService {

	getConfigurations () {
		return new Promise((resolve, reject) => {
			return resolve(configurations)
		})
	}

	storeConfigurations (data) {
		return fs.truncateAsync(__dirname + '/../../config.json')
		.then(() => {
			return fs.writeFileAsync(__dirname + '/../../config.json', JSON.stringify(data, null, 2))
		})
	}
}

export default ConfigService
