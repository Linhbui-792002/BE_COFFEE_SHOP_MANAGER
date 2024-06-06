import General from "../models/general.model.js";

const getGeneral = async () => {
  try {
    const general = await General.find()
      .sort({ createdAt: -1 })
      .limit(1)
      .lean();
    return general[0];
  } catch (error) {
    console.error("Error in getAllGeneral:", error);
    throw error;
  }
};

export { getGeneral };
