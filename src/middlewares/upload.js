import multer from "multer";
import path from "path"
import fs from "fs"
import { BadRequestError } from "../core/error.response.js";

const fileFilter = (req, file, callback) => {
    const allowedMimeTypes = [
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png",
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
        return callback(new BadRequestError("This file type is not supported !"));
    }
    callback(null, true);
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const rootDir = process.cwd()
        console.log(rootDir, 'rootDir');

        //create folders
        fs.mkdirSync(path.join(rootDir, "public/uploads"), { recursive: true });

        //upload file
        callback(null, path.join(rootDir, "/public/uploads"))
    },
    filename: (req, file, callback) => {
        console.log(file, 'file');
        const extension = file.mimetype.replace("image/", "")

        if (!req.savedImages) {
            req.savedImages = []
        }

        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

        const url = `image_${uniqueSuffix}.${extension}`
        console.log(url, 'url')
        req.savedImages = [...req.savedImages, path.join(url)];
        callback(null, url)

    }
})

const upload = multer({ storage, fileFilter }).array("file")

export default upload