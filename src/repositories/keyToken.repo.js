import KeyToken from "../models/keyToken.model.js";

export const findKeyTokenByAccountId = async (accountId) => {
    const found = await KeyToken.findOne({ accountId }).lean();
    return found ? true : false
};