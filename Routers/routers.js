
const router = require("express").Router();
const { getAllTodos, getSingleTodo, addNewTodo, deleteSingleTodo, editTodo, specificUserTodos } = require("../Controllers/controllers");

//GET ALL TODOS
router.get('/todos', getAllTodos);
router.get('/todos/:todoId', getSingleTodo);
router.post('/todos', addNewTodo);
router.delete('/todos/:todoId', deleteSingleTodo);
router.post('/todos/:todoId', editTodo);
router.get('/todos/user/:userId', specificUserTodos);

module.exports = { router };