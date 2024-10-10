
const joi = require('joi');

const validator = (schema) => (payload) => schema.validate(payload, {abortEarly: false});

//LOGIN SCHEMA
const loginSchema = joi.object({
    user_name: joi.string().required(),
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
    user_id: joi.number().integer().required(),
    todo_title: joi.string().required(),
    todo_description: joi.string().required(),
    todo_deadline: joi.date().required(),
    todo_status:joi.number().required()
});

//EDIT USER SCHEMA

let validateLogin = validator(loginSchema);
let validateNewUser = validator(newUserSchema);
let validateNewTodo = validator(newTodoSchema);
 module.exports = { validateLogin, validateNewUser, validateNewTodo };