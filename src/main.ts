import express, { Application, Response, Request, NextFunction } from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import cors from 'cors'
import { socketConnectionHandler as handleSocketConnection } from './webSocket'
import * as dotenv from "dotenv"
dotenv.config();

//express
const app: Application = express()

const PORT = 8080
const vercelSettings="https://vercel.com/rudrakpatras-projects/zkchess/settings/environment-variables"
const workspaceUrl=process.env.GITPOD_WORKSPACE_URL
const html=`
    <h1>
      REMINDER: 
    </h1>
    <a href="${vercelSettings}">
      Set the environment variables in vercel
    </a>
		<br/>
		<h5>SET PUBLIC_MATCHMAKER_URL to this:</h5>
		<h2>
      ${workspaceUrl}
    <h2>
`
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin']
}))

app.get('/', (req: Request, res: Response) => {
  res.status(200).send(html)
})

const httpServer = createServer(app)
httpServer.listen(PORT, () => {
  console.log(`Service starting at ${process.env.GITPOD_WORKSPACE_URL}`)
})

const io = new Server(httpServer, {
  // parser: require("socket.io-msgpack-parser"), TODO https://socket.io/docs/v3/custom-parser/
  // ...
  cors: {
    origin: "*",
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin']
  }
})

io.on('connection', handleSocketConnection)
