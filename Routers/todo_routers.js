
const todoRouter = require("express").Router();
const { getSingleTodoById, getAllTodos, addNewTodo, deleteSingleTodoById, editTodo, specificUserTodos} = require("../Controllers/todo_controllers");

//TODOS ROUTES
todoRouter.get('/todos/:todoId', getSingleTodoById);
todoRouter.get('/todos', getAllTodos);
todoRouter.post('/todos', addNewTodo);
todoRouter.delete('/todos/:todoId', deleteSingleTodoById);
todoRouter.post('/todos/:todoId', editTodo);
todoRouter.get('/todos/user/:userId', specificUserTodos);

module.exports = { todoRouter };