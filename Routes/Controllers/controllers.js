const sql = require("mssql");


//GET ALL TODOS
function getAllTodos(req, res) {
    new sql.Request().query(`select * from todos`,(err, result)=>{
        if (err) {
            console.log("error occured in query", err );
        }else{
            res.json(result.recordset)
        };
    });
};

//GET TODO BY TODO_ID
function getSingleTodo(req, res) {
    let requestedId = req.params.todoId;
    new sql.Request().query(`select * from todos where todo_id = ${requestedId}`, (err, result)=>{
        if (err) {
            console.log("error occured in query", err ); 
        } else {
            res.json(result.recordset[0]);
        };
    });
};

//ADD A NEW TODO
function addNewTodo(req, res) {
    let addedTodo = req.body;
    console.log(addedTodo);
    new sql.Request().query(`INSERT INTO todos(todo_title, todo_description, todo_deadline, todo_status) Values('exersice', 'Do some jogging and pullups', '2024/10/2', 1)`, (err, result)=>{
        if (err) {
            console.log("error occured in query", err ); 
        } else {
            res.json({
                success: true,
                message: "Todo added successfully",
                rowsAffected: result.rowsAffected    
        });
        };
    });
};

//DELETE A SINGLE TODO
function deleteSingleTodo(req, res) {
    let requestedId = req.params.todoId;
    new sql.Request().query(`DELETE FROM todos WHERE todo_id = ${requestedId};`, (err, result)=>{
        if (err) {
            console.log("error occured in query", err ); 
        }
        
        if (!requestedId) {
            res.json({
                success: false,
                message: "Todo not found!"
            });
            return;
        };
            res.json({
                success: true,
                message: "Todo deleted successfully!",
                result: result.rowsAffected
            });
    });
};



module.exports = { getAllTodos, getSingleTodo, addNewTodo, deleteSingleTodo };