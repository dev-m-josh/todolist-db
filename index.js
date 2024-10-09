const express = require("express");
const sql  =require("mssql");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const { todoRouter } = require("./Routers/todo_routers");
const { userRouter } = require("./Routers/users_routers");
const { authRouter } = require("./Routers/auth_routers");
const { verifyToken, errorHandler, routesErrorHandler } = require('./middleware/middleware');


app.use(authRouter);
app.use(verifyToken);
app.use(userRouter);
app.use(todoRouter);
app.use(errorHandler);
app.get('*', routesErrorHandler );


const config = {
    user: "sa",
    password: "Josh@4889",
    server: "localhost",
    database: "TodoList",
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

sql.connect(config, err =>{
    if (err) {
        throw err;
    };
    console.log("Connection successfull!")
});


const port = 3000;
app.listen(port, ()=>{
console.log(`Sever listening to port: ${port}`)
});