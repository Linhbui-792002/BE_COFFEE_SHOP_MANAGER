import mongoose from "mongoose";
import General from "../models/general.model.js";
import { getGeneral, updateGeneral } from "../repositories/general.repo.js";

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
      console.log(idGeneral, "asdas");
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
      console.error("Error updating general:", error);
      throw error;
    }
  };

  static getGeneral = async ({
    select = [
      "_id",
      "name",
      "email",
      "phone",
      "address",
      "logo",
      "favicon",
      "createdAt",
      "updatedAt",
    ],
  }) => {
    return await getGeneral({ select });
  };
}

export default GeneralService;
