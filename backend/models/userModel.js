import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})
// ! We may also define our own custom document instance methods.
// to not to bring the controller into userController we will do it in userSchema and create a methind called matchPassword
userSchema.methods.matchPassword = async function (enteredPassword) {
    // this.password lets us access the password of the user.
    return await bcrypt.compare(enteredPassword, this.password)
}


const User = mongoose.model('User', userSchema)

export default User;

