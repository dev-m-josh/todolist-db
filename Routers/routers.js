
const router = require("express").Router();
const { getAllTodos, getSingleTodo, addNewTodo, deleteSingleTodo, editTodo, specificUserTodos, addNewUser, deleteSingleUser, editUser, getAllUsers,getSingleUser } = require("../Controllers/controllers");

//TODOS ROUTES
router.get('/todos', getAllTodos);
router.get('/todos/:todoId', getSingleTodo);
router.post('/todos', addNewTodo);
router.delete('/todos/:todoId', deleteSingleTodo);
router.post('/todos/:todoId', editTodo);

//USERS ROUTES
router.get('/users', getAllUsers);
router.get('/users/:userId', getSingleUser);
router.post('/users', addNewUser);
router.delete('/users/:userId', deleteSingleUser);
router.post('/users/:userId', editUser);
router.get('/todos/user/:userId', specificUserTodos);

module.exports = { router };