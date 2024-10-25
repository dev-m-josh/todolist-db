
const sql = require("mssql");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { loginSchema, newUserSchema } = require('../validators/validators');

//GET ALL USERS
function getAllUsers(req, res) {
    let pool = req.pool
    let { page, pageSize} = req.query;
    let offset = (Number(page)-1) * Number(pageSize);
    pool.query(`select * from users  ORDER BY user_id OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY`,(err, result)=>{
        if (err) {
            console.log("error occured in query", err );
        }else{
            res.json(result.recordset)
        };
    });
};

//GET SINGLE USER
function getSingleUserById(req, res) {
    let pool = req.pool
    let requestedUser = req.params.userId;
    pool.query(`select user_name, user_email, user_password from users where user_id = ${requestedUser}`, (err, result)=>{

        //CHECK IF REQUESTED USER IS AVAILABLE
        if (result.recordset[0] === undefined) {
            res.json({
                success: false,
                message: "User not found!"
            });
            return;
        };

        //CHECK ERROR AND RESPONSE
        if (err) {
            console.log("error occured in query", err ); 
        } else {
            res.json(result.recordset[0]);
        };
    });
};


//ADDING A USER
function addNewUser(req, res) {
    let pool = req.pool
    let addedUser = req.body;

 //validation
 const {error, value} = newUserSchema.validate(addedUser, {abortEarly});
 if (error) {
     console.log(error);
     res.send(error.details);
     return;
 };

pool.query(`INSERT INTO users(user_name, user_email, user_password)
VALUES ('${value.user_name}', '${value.user_email}', '${value.user_password}')`, (err, result)=>{

    //ERROR AND RESPONSE
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
    let pool = req.pool
    let requestedId = req.params.userId;
    pool.query(`DELETE FROM users WHERE user_id = ${requestedId};`, (err, result)=>{

        //ERROR CHECK
        if (err) {
            console.log("error occured in query", err ); 
        };

        //CHECK IF REQUESTED USER IS AVAILABLE
        if (result.recordset === undefined) {
            res.json({
                success: false,
                message: "User not found!"
            });
            return
        };

        //RESPONSE
            res.json({
                success: true,
                message: "User deleted successfully!",
                result: result.rowsAffected
            });
    });
};

//EDITING A USER
function editUser(req, res) {
    let pool = req.pool
    let userToEditId = req.params.userId;
    let userEdits = req.body;

    pool.query(`
        UPDATE users
        SET user_name = '${userEdits.user_name}', user_email = '${userEdits.user_email}', user_password = '${userEdits.user_password}' WHERE user_id = '${userToEditId}'`, (err, result)=>{

            if (result.recordset === undefined) {
                res.json({
                    success: false,
                    message: "User not found! "
                });
                return
            };

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
let pool = req.pool

let userDetails = req.body;
    
//validation
const {error, value} = loginSchema.validate(userDetails, {abortEarly: false});
if (error) {
    console.log(error);
    res.send(error.details.message);
    return;
};

    //let encryptPassword = await bcrypt.hash(userDetails.user_password, 5)
    //console.log(encryptPassword);
    let requestedUser =  await pool.query(`select user_name, user_email, user_password from  users where user_email = '${value.user_email}'`);
    let user = requestedUser.recordset[0];

//response
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

module.exports = { getAllUsers, getSingleUserById, addNewUser, deleteSingleUserById, editUser, loginUser };
