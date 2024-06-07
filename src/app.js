import * as dotenv from 'dotenv';
import router from './routes/index.js';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors'
import path from 'path';

//init db
import { instanceMongodb } from './database/init.mongodb.js';
import { countConnect, checkOverLoad } from './helpers/check.connect.js';
import corsOptions from './helpers/corsOptions.js';

dotenv.config();
const app = express();
//init middlewares
app.use(morgan('dev'));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(compression());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);


app.use(cors({ credentials: true }));
//init db

// checkOverLoad();

// setUp public file
app.use(express.static(path.resolve("./public")))
app.use("/public", express.static(path.resolve("./public")))
//init routers
app.use('/', router);

//handling error
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        stack: error.stack,
        message: error.message || 'Internal Server Error'
    });
    next(error);
});

export default app;
