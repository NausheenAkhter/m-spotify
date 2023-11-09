import mongoose from "mongoose";
import Jwt from 'jsonwebtoken';
import JoiPasswordComplexity from 'joi-password-complexity';
import Joi from "joi";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    month: { type: String, required: true },
    date: { type: String, required: true },
    year: { type: String, required: true },
    likedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'song', default: [] }],
    playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'playlist', default: [] }],
    isAdmin: { type: Boolean, default: false },
})

userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email })
}

const passwordComplexity = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
}

const getSchema = (kind) => {
    switch (kind) {
        case 'signup': {
            return {
                name: Joi.string().min(5).max(10).required(),
                email: Joi.string().email().required(),
                month: Joi.string().required(),
                date: Joi.string().required(),
                year: Joi.string().required(),
                gender: Joi.string().valid('male', 'female', 'non-binary').required(),
                password: JoiPasswordComplexity(passwordComplexity),
            }
            return
        }
        case 'login': {
            return {
                email: Joi.string().email().required(),
                password: JoiPasswordComplexity(passwordComplexity),
            }
        }
    }
}

userSchema.methods.generateAuthToken = function () {
    try {
        const token = Jwt.sign(
            {
                _id: this._id,
                name: this.name,
                isAdmin: this.isAdmin
            },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '7d' }
        )
        return token
    } catch (error) {
        console.log('failed in creating jwt token');
    }
}

const validate = (user, kind) => {
    const fieldsSchema = getSchema(kind)
    const schema = Joi.object(fieldsSchema)
    return schema.validate(user)
}

const User = mongoose.model('user', userSchema)

export default User
export { validate }