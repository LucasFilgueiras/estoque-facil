import express from "express"
import routes from "./routes"
import bodyParser from "body-parser"
import "dotenv/config"
import cors from "cors"
const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())
app.use(routes)

const serverPort = parseInt(process.env.SERVER_PORT as string, 10) || 3333

app.listen(serverPort, () => console.log("Rodando na porta: " + serverPort))