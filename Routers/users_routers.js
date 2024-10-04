
const userRouter = require("express").Router();
const { getAllUsers, getSingleUser, addNewUser, deleteSingleUser, editUser } = require('../Controllers/users_controllers')


//USERS ROUTES
userRouter.get('/users', getAllUsers);
userRouter.get('/users/:userId', getSingleUser);
userRouter.post('/users', addNewUser);
userRouter.delete('/users/:userId', deleteSingleUser);
userRouter.post('/users/:userId', editUser);

module.exports = { userRouter };
