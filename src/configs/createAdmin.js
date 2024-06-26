import { AdminAccountDefault } from '../constants/index.js';
import AccountService from '../services/account.service.js';

import * as dotenv from 'dotenv';
dotenv.config()

//init db
import { instanceMongodb } from '../database/init.mongodb.js'; 
const createAdmin = async ()=> {
  await AccountService.createAccount(AdminAccountDefault)
  process.exit();
}

createAdmin();
