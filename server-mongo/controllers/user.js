const User = require('../models/User')
const { compareHash } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');



class Controller {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ 'email': email })

            if (!user) {
                throw { name: "INVALID_EMAIL_PASSWORD" }
            }
            if (!compareHash(password, user.password)) {
                throw { name: "INVALID_EMAIL_PASSWORD" }
            }
            const payload = {
                id: user.id,
                name: user.username,
                email: user.email
            }
            const token = createToken(payload)

            res.status(200).json({ 'access_token': token })
        } catch (err) {
            next(err)
        }
    }

    static async register(req, res, next) {
        try {
            const { username, email, password, imageUrl } = req.body

            const user = new User({
                'username': username,
                'email': email,
                'password': password,
                'imageUrl': imageUrl
            })
            await user.save();
            res.status(201).json(user)
        } catch (err) {
            next(err)
        }
    }

    static async listUsers(req, res, next) {
        try {
            const users = await User.find()

            res.status(200).json(users)
        } catch (err) {
            next(err)
        }
    }

    static async findUserById(req, res, next) {
        try {
            const { id } = req.params

            const user = await User.findOne({ _id: id })

            if (!user) throw { name: "NOT_FOUND" }

            res.status(200).json(user)
        } catch (err) {
            next(err)
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const { id } = req.params
            const user = await User.findOne({ _id: id })

            if (!user) throw { name: "NOT_FOUND" }

            await User.deleteOne({ _id: id })
            res.status(200).json({
                message: `User ${user.username} has been deleted successfully.`
            })
        } catch (err) {
            next(err)
        }
    }


}

module.exports = Controller