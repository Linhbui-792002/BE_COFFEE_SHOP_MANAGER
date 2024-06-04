'use strict'

import upload from '../middlewares/upload.js';
import multer from "multer";
import { BadRequestError, ServerError } from "../core/error.response.js";
import { OK } from "../core/success.response.js";

class UploadController {
    static uploadFiles = async (req, res, next) => {
        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                next(new BadRequestError(err));
            } else if (err) {
                next(new BadRequestError(err));
            } else {
                const data = req.savedImages;
                new OK({
                    message: "Update file success",
                    metadata: data
                }).send(res);
            }
        });
    }
}


export default UploadController