import { OK } from "../core/success.response.js";
import GeneralService from "../services/general.service.js";

class GeneralController {
  static updateGeneral = async (req, res, next) => {
    new OK({
      message: "Update general success",
      metadata: await GeneralService.updateGeneral(req.body),
    }).send(res);
  };

  //QUERY//

  static getGeneral = async (req, res, next) => {
    new OK({
      message: "Get general success",
      metadata: await GeneralService.getGeneral(req.query),
    }).send(res);
  };
}

export default GeneralController;
