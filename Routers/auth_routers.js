
const authRouter = require("express").Router();

const { loginUser } = require('../Controllers/users_controllers');

authRouter.post('/users/login', loginUser);


module.exports = { authRouter };