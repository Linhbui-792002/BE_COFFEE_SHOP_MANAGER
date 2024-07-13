
import { BadRequestError } from '../core/error.response.js';
import MenuInfo from '../models/menuInfo.model.js';
const findMenuInfo =  async ({menuInfoId})=>{
    if(!menuInfoId ?? true) throw new BadRequestError('Menu info not found !!!')
    return await MenuInfo.findOne({_id:menuInfoId})
}

export {findMenuInfo}