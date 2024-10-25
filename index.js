const express = require("express");
const cors = require('cors');
const sql  =require("mssql");
const { todoRouter } = require("./Routers/todo_routers");
const { userRouter } = require("./Routers/users_routers");
const { authRouter } = require("./Routers/auth_routers");
const { verifyToken, errorHandler, routesErrorHandler } = require('./middleware/middleware');
require("dotenv").config();
const {config} = require("./config/db_config");

async function startServer() {
    
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    try {
        //CONNECT TO DATABASE
        let pool = new sql.ConnectionPool(config);
        await pool.connect()
        if (pool.connected) {
            console.log("Database connected successfully")
        }
        app.use(function(req, res, next){
            req.pool = pool;
            next()
        })
        
        app.use(authRouter);
        app.use(verifyToken);
        app.use(userRouter);
        app.use(todoRouter);
        app.use(errorHandler);
        app.use('*', routesErrorHandler );
 
        const port = 3500;
        app.listen(port, ()=>{
        console.log(`Sever listening to port: ${port}`)
        });

    } catch (error) {
        console.log(error)
    }

}

startServer()