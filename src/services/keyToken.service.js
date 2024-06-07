"use strict";
import { Types } from "mongoose";
import KeyToken from "../models/keyToken.model.js";

class KeyTokenService {
  static createKeyToken = async ({
    accountId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    try {
      const filter = { accountId: accountId },
        update = {
          publicKey,
          privateKey,
          refreshTokensUsed: [],
          refreshToken,
        },
        options = { upsert: true, new: true };

      const tokens = await KeyToken.findOneAndUpdate(filter, update, options);
      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };

  static findByAccountId = async (accountId) => {
    return await KeyToken.findOne({ accountId: new Types.ObjectId(accountId) });
  };

  static removeKeyById = async (id) => {
    return await KeyToken.deleteOne(id);
  };

  static findByRefreshTokenUsed = async (refreshToken) => {
    return await KeyToken.findOne({ refreshTokensUsed: refreshToken }).lean();
  };

  static findByRefreshToken = async (refreshToken) => {
    return await KeyToken.findOne({ refreshToken });
  };

  static deleteKeyByAccountId = async (accountId) => {
    return await KeyToken.deleteOne({
      accountId: new Types.ObjectId(accountId),
    });
  };
}

export default KeyTokenService;
