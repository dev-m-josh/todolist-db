
const sql = require("mssql");
const { newTodoSchema } = require('../validators/validators');

//GET ALL TODOS
function getAllTodos(req, res) {
    let pool = req.pool
    //PAGINATION
    let { page, pageSize} = req.query;
    let offset = (Number(page)-1) * Number(pageSize);

    //GET ALL TODOS
    pool.query(`select * from todos  ORDER BY todo_id OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY`,(err, result)=>{
        if (err) {
            console.log("error occured in query", err );
        }else{
            res.json(result.recordset)
        };
    });
};

//GET TODO BY TODO_ID
function getSingleTodoById(req, res) {
    let pool = req.pool
    let requestedId = req.params.todoId;

    pool.query(`select * from todos where todo_id = ${requestedId}`, (err, result)=>{
        
        //CHECK IF REQUESTED TODO IS AVAILABLE
        if (result.recordset[0] === undefined) {
            res.json({
                success: false,
                message: "Todo not found!"
            });
            return
        };
        //ERROR
        if (err) {
            console.log("error occured in query", err ); 
            return;
        };

        //RESPONSE
        res.json(result.recordset[0]);
    });
};

//ADD A NEW TODO
function addNewTodo(req, res) {
    let pool = req.pool
    let addedTodo = req.body;
    
     //VALIDATE
     const {error, value} = newTodoSchema.validate(addedTodo, {abortEarly: false});
     if (error) {
         console.log(error);
         res.send(error.details);
         return;
     };

    pool.query(`INSERT INTO todos(todo_title, todo_status) Values('${value.todo_title}', '${value.todo_status}')`, (err, result)=>{

        //ERROR AND RESPONSE
        if (err) {
            console.log("error occured in query", err ); 
        } else {
            res.json({
                todo_title: addedTodo.todo_title   
        });
        };
    });
};

//DELETE A SINGLE TODO BASED ON I'TS ID
function deleteSingleTodoById(req, res) {
    let pool = req.pool
    let requestedId = req.params.todoId;
    
    pool.query(`DELETE FROM todos WHERE todo_id = ${requestedId}`, (err, result)=>{

    // //CHECK IF REQUESTED TODO IS AVAILABLE
    // if (result.recordset === undefined) {
    //     res.json({
    //         success: false,
    //         message: "Todo not found!"
    //     });
    //     return;
    // };

    //ERROR
    if (err) {
        console.log("error occured in query",err ); 
    };

    //RESPONSE
    res.json({
        success: true,
        message: "Todo deleted successfully!",
        // result: result.rowsAffected
    });
  });
};

//EDITING A TODO
function editTodo(req, res) {
    let pool = req.pool
    let todoToEditId = req.params.todoId;
    let todoEdits = req.body;

    pool.query(`
        UPDATE todos
        SET todo_status = '${todoEdits.todo_status}'
        WHERE todo_id = '${todoToEditId}'`, (err, result)=>{
            if (err) {
                console.log("Error occured in query", err)
            }else{
                res.json({
                    success: true,
                    message: "Edit was successfully done.",
                    rowsAffected: result.rowsAffected
                });
            };
        });
};

//GET ALL TODOS OF A SPECIFIC USER
function specificUserTodos(req, res) {
    let pool = req.pool
    let requestedUser = req.params.userId;
    let { page, pageSize} = req.query;
    let offset = (Number(page)-1) * Number(pageSize);
    pool.query(`SELECT todo_id, todo_title, todo_description, todo_deadline, todo_status 
FROM todos
WHERE user_id = ${requestedUser} ORDER BY todo_id OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY`, (err, result)=>{

    //CHECK IF REQUESTED USER IS AVAILABLE
    if (result.recordset[0] === undefined) {
        res.json({
            success: false,
            message: "Requested user not found!"
        });
        return;
    };

    //ERROR AND RESPONSE
    if (err) {
        console.log("Error occured in query", err);
    } else {
        res.json(result.recordset);
    };
});
};


module.exports = { getAllTodos, getSingleTodoById, addNewTodo, deleteSingleTodoById, editTodo, specificUserTodos };