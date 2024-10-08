
const userRouter = require("express").Router();
const { getAllUsers, deleteSingleUserById, getSingleUserById, addNewUser, editUser } = require('../Controllers/users_controllers');

//USERS ROUTES
userRouter.get('/users', getAllUsers);
userRouter.delete('/users/:userId', deleteSingleUserById);
userRouter.get('/users/:userId', getSingleUserById);
userRouter.post('/users', addNewUser);
userRouter.put('/users/:userId', editUser);

module.exports = { userRouter };
