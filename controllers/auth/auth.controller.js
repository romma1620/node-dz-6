const {authService, userService} = require('../../service');
const {ErrorHandler} = require('../../errors');
const {tokenGenerator, checkHashPassword} = require('../../helpers');
const {authEnum} = require('../../constants')

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await userService.getUserByParams({email});

            if (!user){
                return next(new ErrorHandler('Miss user', 404, 4041))
            }

            await checkHashPassword(user.password, password);

            const tokens = tokenGenerator();

            await authService.createTokenPair({...tokens, userId: user.id});

            res.json(tokens);

        }catch (e) {

            next(e)
        }

    },

    logoutUser: async (req, res, next) => {
        try {

            const access_token = req.get(authEnum.AUTH);

            await authService.deleteById({access_token});

            res.sendStatus(200);

        }catch (e) {
            next(e)
        }
    }

};
