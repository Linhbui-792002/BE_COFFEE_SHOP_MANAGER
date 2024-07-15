'use strict';

import express from 'express';
import { asyncHandler } from '../helpers/asyncHandler.js';
import UploadController from '../controllers/upload.controller.js';

const routerUpload = express.Router();

routerUpload.post("/", asyncHandler(UploadController.uploadFiles))

export default routerUpload;