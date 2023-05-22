const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../configs/database');
const superAdminSchema = mongoose.Schema(
{
    username: 
    {
        type: String,
        required: true,
        trim: true
    },
    token:
    {
        type: String,
        required: false
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

superAdminSchema.methods.generateAuthToken = async function() 
{
    // Generate an auth token for the super admin
    const superAdmin = this;
    const token = jwt.sign({_id: superAdmin._id}, db.secret);
    superAdmin.token = token;
    await superAdmin.save();
    return token;
};

superAdminSchema.statics.findByCredentials = async (username) => 
{
    // Search for a super admin by email and password.
    const superAdmin = await SuperAdmin.findOne({username});
    if (!superAdmin) 
    {
        return null;
    }
    return superAdmin;
};


const SuperAdmin = mongoose.model('SuperAdmin', superAdminSchema);

module.exports = SuperAdmin;
