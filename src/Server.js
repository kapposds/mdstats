import express from 'express'
import cors from 'cors'
import http from 'http'
import routes from './routes'

class Server {
	constructor() {
		this.app = express()
	}

	start () {
		this.app.use(cors())
		this.app.use('/api', routes)
		this.server = http.createServer(this.app);
		this.server.listen(5000)
	}
}

export default Server
