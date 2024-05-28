export default class UserController {
    static findAll = async (req, res, next) => {
        try {
            console.log(req.cookies);
        } catch (error) {
            next(error);
        }
    }
}