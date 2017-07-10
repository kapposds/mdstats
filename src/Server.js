import express from 'express'
import http from 'http'
import routes from './routes'

class Server {
	constructor() {
		this.app = express()
		this.app.use('/api', routes)
		this.server = http.createServer(this.app);

	}

	start () {
		this.server.listen(5000)
	}
}

export default Server
