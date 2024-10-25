
const authRouter = require("express").Router();

const { loginUser } = require('../Controllers/users_controllers');
const { getAllTodos } = require('../Controllers/todo_controllers')

authRouter.post('/users/login', loginUser);
authRouter.get('/todos', getAllTodos);

module.exports = { authRouter };