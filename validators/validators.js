
const joi = require('joi');

//LOGIN SCHEMA
const loginSchema = joi.object({
    user_email: joi.string().required(),
    user_password: joi.string().min(8).max(64).required()
});

 //CREATING A NEW USER
 const newUserSchema = joi.object({
    user_name: joi.string().required(),
    user_email: joi.string().email().required(),
    user_password: joi.string().min(8).max(64).required()
});



// A NEW TODO
const newTodoSchema = joi.object({
    todo_title: joi.string().required(),
    todo_status:joi.boolean().required()
});


module.exports = { loginSchema, newUserSchema, newTodoSchema };