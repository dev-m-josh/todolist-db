const router = require("express").Router();
const { getAllTodos, getSingleTodo, addNewTodo, deleteSingleTodo } = require("./Controllers/controllers");

//GET ALL TODOS
router.get('/todos', getAllTodos);
router.get('/todos/:todoId', getSingleTodo);
router.post('/todos', addNewTodo);
router.delete('/todos/:todoId', deleteSingleTodo);

module.exports = { router };

