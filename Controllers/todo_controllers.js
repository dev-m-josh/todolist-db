
const sql = require("mssql");

//GET ALL TODOS
function getAllTodos(req, res) {
    let { page, pageSize} = req.query;
    let offset = (Number(page)-1) * Number(pageSize);
    new sql.Request().query(`select * from todos  ORDER BY todo_id OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY`,(err, result)=>{
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
    new sql.Request().query(`INSERT INTO todos(user_id, todo_title, todo_description, todo_deadline, todo_status) Values('${addedTodo.user_id}','${addedTodo.todo_title}', '${addedTodo.todo_description}', '${addedTodo.todo_deadline}', '${addedTodo.todo_status}')`, (err, result)=>{
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

//DELETE A SINGLE TODO BASED ON I'TS ID
function deleteSingleTodo(req, res) {
    let requestedId = req.params.todoId;
    new sql.Request().query(`DELETE FROM todos WHERE todo_id = ${requestedId};`, (err, result)=>{
        if (err) {
            console.log("error occured in query", err ); 
        };
            res.json({
                success: true,
                message: "Todo deleted successfully!",
                result: result.rowsAffected
            });
    });
};

//EDITING A TODO
function editTodo(req, res) {
    let todoToEditId = req.params.todoId;
    let todoEdits = req.body;

    new sql.Request().query(`
        UPDATE todos
        SET user_id =  '${todoEdits.user_id}',  todo_title = '${todoEdits.title}', todo_description = '${todoEdits.description}', todo_status = ${todoEdits.status}
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
    let requestedUser = req.params.userId;
    let { page, pageSize} = req.query;
    let offset = (Number(page)-1) * Number(pageSize);
    new sql.Request().query(`SELECT todo_id, todo_title, todo_description, todo_deadline, todo_status 
FROM todos
WHERE user_id = ${requestedUser} ORDER BY todo_id OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY`, (err, result)=>{
    if (err) {
        console.log("Error occured in query", err);
    } else {
        res.json(result.recordset);
    };
});
};



module.exports = { getAllTodos, getSingleTodo, addNewTodo, deleteSingleTodo, editTodo, specificUserTodos };