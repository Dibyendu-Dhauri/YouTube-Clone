import  express from "express";
import Ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

// Set ffmpeg path from the installer
Ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const app = express();
app.use(express.json());



app.post('/process-video', (req,res) => {
    // Get the path of the input video file from the request body
    const {inputFilePath,outputFilePath} = req.body;

    // check the path is defined
    if(!inputFilePath || !outputFilePath){
        return res.status(400).json({ success:false,error: 'Missing file paths' });
    }

    // create ffmpeg command
    Ffmpeg(inputFilePath)
        .outputOptions('-vf','scale=-1:360') // 360p
        .on('progress', (progress) => {
            console.log("In Progress")
        })
        .on('end',()=>{
            console.log('Prcessing finished successfully');
            res.status(200).json({success:true, message: 'Processing finished successfully' });
        })
        .on('error',(err:any)=>{
            console.log('An error occurred: ' + err.message);
            res.status(500).json({ success:false,error: `Processing failed: ${err.message}` });
        })
        .save(outputFilePath)
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})