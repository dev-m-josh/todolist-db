
const sql = require("mssql");
const bcrypt = require('bcrypt');
//const {getToken} = require('../utils/utils')
const jwt = require('jsonwebtoken')

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
function getSingleUserById(req, res) {
    let requestedUser = req.params.userId;
    new sql.Request().query(`select user_name, user_email, user_password from users where user_id = ${requestedUser}`, (err, result)=>{
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
    new sql.Request().query(`INSERT INTO users(user_name, user_email, user_password)
VALUES ('${addedUser.user_name}', '${addedUser.user_email}', '${addedUser.user_password}')`, (err, result)=>{
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
function deleteSingleUserById(req, res) {
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
        SET user_name = '${userEdits.user_name}', user_email = '${userEdits.user_email}', user_password = '${userEdits.user_password}' WHERE user_id = '${userToEditId}'`, (err, result)=>{
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

//USER LOGIN
async function loginUser(req, res) {
    let userDetails = req.body;
    //let encryptPassword = await bcrypt.hash(userDetails.user_password, 5)
    //console.log(encryptPassword);
    let requestedUser =  await new sql.Request().query(`select * from  users where user_email = '${userDetails.user_email}'`);
    let user = requestedUser.recordset[0];

    if (!user) {
        res.json({
            success: false,
            message: "User not found!"
        });
        return;
    };

    let token = await jwt.sign({user}, 'secretkey');


    try {
        let passwordComparisson = await bcrypt.compare(userDetails.user_password, user.user_password);

        if (passwordComparisson) {
            res.json({
                Message:'logged successfully',
                token
            });
        }else{
            res.json({
                Message:'Wrong creditials!'
            });
        };
    
    } catch (error) {
        res.status(500).json(error,{
            Message:'Internal sever error'
        });
    };
    
};





module.exports = { getAllUsers, getSingleUserById, addNewUser, deleteSingleUserById, editUser, loginUser }
