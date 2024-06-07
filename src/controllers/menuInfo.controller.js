import { CREATED, OK, SuccessResponse } from "../core/success.response.js"
import MenuInfoService from "../services/menuInfo.service.js"

class MenuInfoController {

    static getAllMenuInfo = async (req, res, next) => {
        new SuccessResponse({
            message: "Get all menu info success",
            metadata: await MenuInfoService.getAllMenuInfo(req.query)
        }).send(res)
    }

    static getOneMenuInfo = async (req, res, next) => {
        new SuccessResponse({
            message: "Get one menu info success",
            metadata: await MenuInfoService.getOneMenuInfo({
                menuInfoId: req.params.id
            })
        }).send(res)
    }

    static addNewMenuInfo = async (req, res, next) => {
        const { body } = req
        new CREATED({
            message: "Add menu info success",
            metadata: await MenuInfoService.createMenuInfo(body)
        }).send(res)
    }

    static updateMenuInfo = async (req, res, next) => {
        const { body } = req
        new OK({
            message: "Update menu info success",
            metadata: await MenuInfoService.updateMenuInfo(body)
        }).send(res)
    }
}

export default MenuInfoController