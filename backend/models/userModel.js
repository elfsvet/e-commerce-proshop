import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const {Schema, model} = mongoose;

const userSchema = new Schema({
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

// to hash a password before save/create/update
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


const User = model('User', userSchema)

export default User;

