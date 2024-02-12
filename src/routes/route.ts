import { Router } from "express";
import { DownloadController } from "../controller/downloadController";

const router = Router()
const download = new DownloadController()

router.post("/download", download.execute)
router.get("/", (request, response)=>{
    return response.json({message: "Start"})
})

export default router