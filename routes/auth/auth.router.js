const {Router} = require('express');

const authRouter = Router();

const {authController} = require('../../controllers')
const {authMiddleware} = require('../../middlewares')

authRouter.post('/', authController.loginUser);
authRouter.post('/logout', authMiddleware.checkAccessToken, authController.logoutUser)


module.exports = authRouter;
