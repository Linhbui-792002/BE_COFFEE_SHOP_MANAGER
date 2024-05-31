import * as dotenv from 'dotenv';
dotenv.config()
const whiteList = [process.env.CORS_WHITELIST_1, process.env.CORS_WHITELIST_2];

const corsOptions = (req, callback) => {
  let options;
  console.log(req.header('Origin'), whiteList);

  if (whiteList.includes(req.header('Origin'))) {
    console.log('origin true');
    options = { origin: true };
  } else {
    console.log('origin false');
    options = { origin: false };
  }
  callback(null, options);
};

export default corsOptions;
