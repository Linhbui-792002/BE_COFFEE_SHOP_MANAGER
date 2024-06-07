import mongoose from "mongoose";
import General from "../models/general.model.js";
import { getGeneral } from "../repositories/general.repo.js";

class GeneralService {
  static updateGeneral = async ({
    generalId,
    name,
    email,
    phone,
    address,
    logo,
    favicon,
  }) => {
    try {
      const idGeneral = generalId ?? new mongoose.Types.ObjectId();
      const filter = { _id: idGeneral },
        update = {
          name,
          email,
          phone,
          address,
          logo,
          favicon,
        },
        options = { upsert: true, new: true };

      const updatedGeneral = await General.findOneAndUpdate(
        filter,
        update,
        options
      );
      return updatedGeneral ? updatedGeneral : null;
    } catch (error) {
      throw error;
    }
  };

  static getGeneral = async () => {
    return await getGeneral();
  };
}

export default GeneralService;
