const mongoose = require("mongoose");
// instaliranje na validator npm i validator
const validator = require("validator")
const crypt = require("bcryptjs")

const userShema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name is required"],
    },
    email: {
        type: String,
        require: true, // site bukvi da se mali
        unique: true, // sekoj email da nie razlicen
        validate: [validator.isEmail, , "Pleace provide a valida email"], // validacija preku biblioteka 
    },
    password: {
        type: String,
        reqired: [true, "Password is required"],
        minlenght: [8, "Password must be at least 8 characters"],
        // validate: [
        //  validator.isStrongPassword,
        // "Pleace provide a strong password which contains...",    
        //],
    },
});

userShema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.nash(this.password, 12);
    next();
})

const User = mongoose.model("User", userShema);

module.exports = User;


