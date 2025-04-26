import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema({
            name: {
                        type: String,
                        required: [true, "name field are required"],
                        lowercase: true,
                        minlength: 3,
                        trim: true
            },
            email: {
                        type: String,
                        required: [true, "Email is required"],
                        unique: true,
                        lowercase: true,
                        trim: true,
                        validate: [validator.isEmail, "Please provide a valid  email"]
            },
            password: {
                        type: String,
                        required: [true, "Password is required"],
                        minlength: 6,
                        select: false
            }

}, { timestamps: true });

userSchema.pre("save", async function (next) {
            if (!this.isModified("password")) return next();
            try {
                        this.password = await bcrypt.hash(this.password, 10);
                        next();
            } catch (error) {
                        next(error)
            }
});

userSchema.methods.comparePassword = async function (candidatepassword) {
            return await bcrypt.hash(candidatepassword, this.password);
}

userSchema.post("save", (error, doc, next) => {
            if (error.name === "MongoServerError" && error.code === 11000) {
                        next(new Error("Email already exists"));
            } else {
                        next(error);
            }
});

userSchema.post("findOneAndUpdate", (error, doc, next) => {
            if (error.name === "MongooseServerError" && error.code === 11000) {
                        next(new Error("Email already exist"));
            } else {
                        next(error)
            }
});



const User = mongoose.model("User", userSchema);

export default User;