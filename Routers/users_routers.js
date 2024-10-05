
const userRouter = require("express").Router();
const { getAllUsers, getSingleUserById, addNewUser, deleteSingleUserById, editUser, loginUser } = require('../Controllers/users_controllers')


//USERS ROUTES
userRouter.get('/users', getAllUsers);
userRouter.get('/users/:userId', getSingleUserById);
userRouter.post('/users', addNewUser);
userRouter.delete('/users/:userId', deleteSingleUserById);
userRouter.put('/users/:userId', editUser);
userRouter.post('/users/login', loginUser);

module.exports = { userRouter };
