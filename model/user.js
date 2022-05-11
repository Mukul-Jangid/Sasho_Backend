const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const { Schema } = mongoose;
const validator = require('validator')
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please Provide Name'],
        maxlength: [20, 'Should not exceed 20 char'],
    },
    email: {
        type: String,
        required: [true, 'Please provide Email'],
        unique: true,
        validate: [validator.isEmail, 'Please Check email is correct or not']
    },
    password: {
        type: String,
        required: [true, 'Please provide Password'],
        minlength: [6, 'password should be of 6 character'],
        select: false //does not return password field in object         
    },
    role: {
        type: String,
        default: "Buyer",
        enum: ["Admin", "Seller", "Buyer"]
    },
    purchases: {
        type: Array,
        default: []
    },

    seller: {
        shopName: {
            type: String,
            trim: true,
            unique: true//TO BE CHECKED
            //required: [true, 'Please provide your shop name']
        },
        phoneNumber: {
            type: Number,
            trim: true,
            //required: [true, 'Please provide a valid Phone number to contact']
        }, 
        isActive: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            default: 'Waiting Approval',
            enum: ['Waiting Approval', 'Rejected', 'Approved']
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})


userSchema.methods.validatePassoword = async function (usersendpassword) {
    return bcrypt.compare(usersendpassword, this.password);
}

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {

        expiresIn: `${process.env.JWT_EXPIRY}`
    });
}
module.exports = mongoose.model("User", userSchema);