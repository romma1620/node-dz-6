const jwt = require('jsonwebtoken');

const {authService} = require('../../service')
const {authEnum,wordsEnum: {JWT_REFRESH_SECRET, JWT_SECRET}} = require('../../constants');
const {ErrorHandler} = require('../../errors')

module.exports = async (req, res, next) => {
    try {


        const token = req.get(authEnum.AUTH);

        if (!token) {
            return next(new ErrorHandler('No token', 400, 4002));
        }

        jwt.verify(token, JWT_SECRET, err => {
            if (err) {
                throw new ErrorHandler('Invalid token', 401, 4011);
            }
        });

        const tokenFromDB = await authService.getTokenByParams({access_token: token});

        if (!tokenFromDB) {
            return next(new ErrorHandler('Invalid token', 401, 4011));
        }

        req.userId = tokenFromDB.userId
        next()

    }catch (e) {
        next(e)

    }

}
