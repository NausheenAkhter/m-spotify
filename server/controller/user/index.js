import User, { validate } from "../../models/users.js"
import bcrypt from 'bcrypt'

const signUp = async (req, res) => {
    const { error } = validate(req.body, 'signup')
    if (error) throw error
    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    const encodedPassword = await bcrypt.hash(req.body.password, salt)
    const newUser = await new User({ ...req.body, password: encodedPassword }).save()
    newUser.password = undefined
    newUser.__v = undefined
    res.status(200).send({ message: 'Account created successfully!', data: newUser })
}

const loginUser = async (req, res) => {
    const { error } = validate(req.body, 'login')
    if (error) throw error
    const user = await User.findByEmail(req.body.email)
    if (!user) throw new Error('Invalid email or password!')
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (validPassword) {
        const token = user.generateAuthToken()
        res.status(200).send({ message: 'Logged in!', data: token })
    } else {
        throw new Error('Incorrect password')
    }
}
const getAllUsers = async (req, res) => {
    const user = await User.find().select('-password -__v')
    res.status(200).send({ message: 'Fetched users!', data: user })

}
const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password -__v')
    .populate([{ 
        path: 'playlists', 
        model: 'playlist',
        populate: [{ path: 'songs' } ]
    }]).populate('likedSongs')
    res.status(200).send({ message: 'Fetched user!', data: user })

}

const updateUserById = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).select('-password -__v')
    res.status(200).send({ message: 'user updated!', data: user })
}
const deleteUserById = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).send({ message: 'successfully deleted user!' })
}

export { signUp, loginUser, getAllUsers, getUserById, updateUserById, deleteUserById }