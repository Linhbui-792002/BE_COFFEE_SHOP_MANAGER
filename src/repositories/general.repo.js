import General from "../models/general.model.js";

const getGeneral = async ({ select }) => {
  const general = await General.find().select(select).lean();
  return general;
};

const updateGeneral = async ({
  generalId,
  name,
  email,
  phone,
  address,
  logo,
  favicon,
}) => {
  const updateGeneral = await General.findOneAndUpdate(
    { generalId },
    {
      name,
      email,
      phone,
      address,
      logo,
      favicon,
    },
    { new: true, lean: true }
  );

  return updateGeneral;
};

export { getGeneral, updateGeneral };
