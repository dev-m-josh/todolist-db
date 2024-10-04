
const userRouter = require("express").Router();
const { getAllUsers, getSingleUserById, addNewUser, deleteSingleUserById, editUser } = require('../Controllers/users_controllers')


//USERS ROUTES
userRouter.get('/users', getAllUsers);
userRouter.get('/users/:userId', getSingleUserById);
userRouter.post('/users', addNewUser);
userRouter.delete('/users/:userId', deleteSingleUserById);
userRouter.post('/users/:userId', editUser);

module.exports = { userRouter };
