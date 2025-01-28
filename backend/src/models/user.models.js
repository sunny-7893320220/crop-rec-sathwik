import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    farmersName: {
        type: String,
        required: true,
    },
    farmersPhone: {
        type: String,
        required: true,
    },
    farmersEmail: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
    },
});

userSchema.methods.generateAccessToken = function () {
    console.log("Access Token Expiry: ", process.env.ACCESS_TOKEN_EXPIRY);
    return jwt.sign({
        _id: this._id,
        farmersEmail: this.farmersEmail,
        farmersName: this.farmersName,
        farmersPhone: this.farmersPhone
    },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn:`${ process.env.ACCESS_TOKEN_EXPIRY}` }
    );
};

userSchema.methods.generateRefreshToken = function () {
    console.log("Refresh Token Expiry: ", process.env.REFRESH_TOKEN_EXPIRY);
    return jwt.sign({
        _id: this._id,
        farmersEmail: this.farmersEmail,
        farmersName: this.farmersName,
        farmersPhone: this.farmersPhone
    },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: `${process.env.REFRESH_TOKEN_EXPIRY}`  }
    );
};


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
})

// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         return next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });


userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


export const User = mongoose.model('User', userSchema)