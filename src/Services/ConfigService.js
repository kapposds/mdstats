import Promise from 'bluebird'
import path from 'path'
import fs  from 'fs'
Promise.promisifyAll(fs)
const configurations = require(process.cwd() + '/config.json')

/**
 * Class responsible for retrieving and storing global configurations
 */
class ConfigService {
	getConfigurations () {
		const configPath = path.join(process.cwd(), '/config.json')
		return fs.readFileAsync(configPath, 'utf8')
		.then(configurationsRaw => {
			return JSON.parse(configurationsRaw)
		})
	}

	storeConfigurations (data) {
		const configPath = path.join(process.cwd(), '/config.json')
		return fs.truncateAsync(configPath)
		.then(() => {
			return fs.writeFileAsync(configPath, JSON.stringify(data, null, 2))
		})
	}
}

export default ConfigService
