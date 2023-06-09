const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../configs/database');
const userSchema = mongoose.Schema(
{
    firstName: 
    {
        type: String,
        required: true,
        trim: true
    },
    lastName: 
    {
        type: String,
        required: true,
        trim: true
    },
    password: 
    {
        type: String,
        required: true,
        minLength: 7
    },
    token:
    {
        type: String,
        required: false
    },
    email: 
    {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => 
        {
            if (!validator.isEmail(value))
            {
                throw new Error({error: 'Invalid Email address'});
            }
        }
    }
}, {
    versionKey: false,
    id: true,
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.password
            delete ret.token
        }
  }
});

userSchema.pre('save', async function (next) 
{
    // Hash the password before saving the user model
    const user = this;
    if (user.isModified('password')) 
    {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.methods.generateAuthToken = async function() 
{
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({_id: user._id}, db.secret);
    user.token = token;
    await user.save();
    return token;
};

userSchema.statics.findByCredentials = async (email, password) => 
{
    // Search for a user by email and password.
    const user = await User.findOne({email});
    if (!user) 
    {
        return null;
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) 
    {
        return null;
    }
    return user;
};


const User = mongoose.model('User', userSchema);

module.exports = User;
