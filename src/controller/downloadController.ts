import { Request, Response } from "express";
import ytdl from "ytdl-core";

export class DownloadController {
    async execute(request: Request, response: Response){
        try {  
            const {url_video, formatArchive, quality} = request.body
            const title = (await ytdl.getInfo(url_video)).player_response.videoDetails
            
            if(!url_video){
                return response.status(400).json({error: "Url não inserida"})
                
            }

            if(!quality){
                return response.status(400).json({error: "Formato do arquivo não inserido"})
                
            }

            if(formatArchive == "video"){
                const video = ytdl(url_video, {filter: format => format.qualityLabel === quality})
                response.setHeader(`Content-Disposition`, `attachment; filename=${title}.mp4`);
                response.setHeader('Content-Type', 'video/mp4');
                video.pipe(response)
                return
            }

            const video = ytdl(url_video, {filter: format => format.audioBitrate === quality})
            response.setHeader(`Content-Disposition`, `attachment; filename=${title}.mp3`);
            response.setHeader('Content-Type', 'audio/mpeg');
            video.pipe(response)
        } catch (error) {
            console.log(error.message)
            response.status(500).json({error: `Erro no download ${error}`})
        }
    }
}