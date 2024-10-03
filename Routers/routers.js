
const router = require("express").Router();
const { getAllTodos, getSingleTodo, addNewTodo, deleteSingleTodo, editTodo } = require("../Controllers/controllers");

//GET ALL TODOS
router.get('/todos', getAllTodos);
router.get('/todos/:todoId', getSingleTodo);
router.post('/todos', addNewTodo);
router.delete('/todos/:todoId', deleteSingleTodo);
router.post('/todos/:todoId', editTodo)

module.exports = { router };