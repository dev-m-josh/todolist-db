const express = require("express");
const sql  =require("mssql");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const { router } = require("./Routers/todo_routers");
const { userRouter } = require("./Routers/users_routers");
app.use(router);
app.use(userRouter);

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