import express from "express"
import cors from "cors"
import router from "./routes/route"
import bodyParser from "body-parser"

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use("/", router)

export default app