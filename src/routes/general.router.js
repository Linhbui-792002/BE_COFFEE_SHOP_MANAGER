"use strict";
import express from "express";
import { asyncHandler } from "../helpers/asyncHandler.js";
import { authentication, checkAdminRole } from "../auth/authUtils.js";
import GeneralController from "../controllers/general.controller.js";

const routerGeneral = express.Router();

// authentication
routerGeneral.use(asyncHandler(authentication));

// Role admin
routerGeneral.use(asyncHandler(checkAdminRole));

routerGeneral.get("/", asyncHandler(GeneralController.getGeneral));

routerGeneral.post("/", asyncHandler(GeneralController.updateGeneral));

export default routerGeneral;
