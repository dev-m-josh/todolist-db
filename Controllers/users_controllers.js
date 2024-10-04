
const sql = require("mssql");

//GET ALL USERS
function getAllUsers(req, res) {
    let { page, pageSize} = req.query;
    let offset = (Number(page)-1) * Number(pageSize);
    new sql.Request().query(`select * from users  ORDER BY user_id OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY`,(err, result)=>{
        if (err) {
            console.log("error occured in query", err );
        }else{
            res.json(result.recordset)
        };
    });
};

//GET SINGLE USER
function getSingleUser(req, res) {
    let requestedUser = req.params.userId;
    new sql.Request().query(`select user_name, user_email from users where user_id = ${requestedUser}`, (err, result)=>{
        if (err) {
            console.log("error occured in query", err ); 
        } else {
            res.json(result.recordset[0]);
        };
    });
};


//ADDING A USER
function addNewUser(req, res) {
    let addedUser = req.body;
    new sql.Request().query(`INSERT INTO users(user_name, user_email)
VALUES ('${addedUser.user_name}', '${addedUser.user_email}')`, (err, result)=>{
    if (err) {
        console.log("error occured in query", err ); 
    } else {
        res.json({
            success: true,
            message: "User added successfully",
            rowsAffected: result.rowsAffected    
    });
    };
});
};

//DELETE A SINGLE USER BASED ON ID
function deleteSingleUser(req, res) {
    let requestedId = req.params.userId;
    new sql.Request().query(`DELETE FROM users WHERE user_id = ${requestedId};`, (err, result)=>{
        if (err) {
            console.log("error occured in query", err ); 
        };
            res.json({
                success: true,
                message: "User deleted successfully!",
                result: result.rowsAffected
            });
    });
};

//EDITING A USER
function editUser(req, res) {
    let userToEditId = req.params.userId;
    let userEdits = req.body;

    new sql.Request().query(`
        UPDATE users
        SET user_name = '${userEdits.user_name}', user_email = '${userEdits.user_email}' WHERE user_id = '${userToEditId}'`, (err, result)=>{
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

module.exports = { addNewUser, getAllUsers, editUser, deleteSingleUser, getSingleUser }
