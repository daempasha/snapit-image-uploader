const express = require("express");
const cors = require('cors');
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config()

const { MAX_FILE_SIZE } = require("./constants");
const { uploadImage } = require("./helpers");

const app = express()
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: MAX_FILE_SIZE
    }
});

app.use(cors())
app.use(express.json())
const port = process.env.PORT ? parseInt(process.env.PORT) : 3001

app.get('/', (req, res) => {
    res.send('Hello World!')
})


// async function uploadToCloudinary(localPath) {
//     var mainFolderName = "main";
//     var filePathOnCloudinary =
//         mainFolderName + "/" + localPath;

//     return cloudinary.uploader
//         .upload(localPath, { public_id: filePathOnCloudinary })

// }

app.post("/api/upload-file", upload.single("image"), async (req, res, next) => {
    try {
        const file = req.file
        const response = await uploadImage(file)
        res.send({ url: response })

    } catch (error) {
        res.status(500).send(error)
    }
})


const hostname = process.env.NODE_ENV === "development" ? "192.168.0.1" : "0.0.0.0";
app.listen(port, hostname, () => {
    console.log(`App listening on port ${port}`)
})