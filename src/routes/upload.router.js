'use strict';

import express from 'express';
import { asyncHandler } from '../helpers/asyncHandler.js';
import { authentication } from '../auth/authUtils.js';
import UploadController from '../controllers/upload.controller.js';

const routerUpload = express.Router();
routerUpload.use(asyncHandler(authentication))

routerUpload.post("/", asyncHandler(UploadController.uploadFiles))

export default routerUpload;