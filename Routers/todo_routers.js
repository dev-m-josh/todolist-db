
const router = require("express").Router();
const { getAllTodos, getSingleTodoById, addNewTodo, deleteSingleTodoById, editTodo, specificUserTodos} = require("../Controllers/todo_controllers");

//TODOS ROUTES
router.get('/todos', getAllTodos);
router.get('/todos/:todoId', getSingleTodoById);
router.post('/todos', addNewTodo);
router.delete('/todos/:todoId', deleteSingleTodoById);
router.post('/todos/:todoId', editTodo);
router.get('/todos/user/:userId', specificUserTodos);

module.exports = { router };