import express from 'express';
const app = express();
import { dbconn } from './connection';
import dotenv from 'dotenv';

import { router } from './route/routes';

dotenv.config();
import { Redis } from 'ioredis';
import connectRedis from 'connect-redis'
import * as path from 'path';
const swaggerUi = require('swagger-ui-express')
import YAML from 'yamljs';
const swaggerDocument = YAML.load(path.join(__dirname,'./swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// const redisClient = Redis.createClient();
const options ={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'API FOR SEQEL',
            version:'1.0.0'
        },
        servers:[
            {
                url : 'http://localhost:3000/'
            }
        ]
    },
    apis:['./routes/routes.ts']
}

dbconn();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api",router)
app.listen(process.env.PORT, async()=>{
    // dbconn();



    console.log(`server listing on ${process.env.PORT}`);

})


