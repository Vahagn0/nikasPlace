const User = require('../models/user');
const apiResponse = require("../helpers/apiResponse");

const registerUser = async (req, res) => 
{ 
    try {
        const { email, firstName, lastName, password } = req.body;
        console.log("🚀", email, firstName, lastName, password);
        const existingUser = await User.findOne({ email });
        if (existingUser) { 
            return apiResponse.validationErrorWithData(res, 'Existing user', null);
        }
        const user = new User({ email, firstName, lastName, password }); 
        await user.save();
        const token = await user.generateAuthToken();
        return apiResponse.successResponseWithData(res, 'Success', { user, token });
    } catch (error) {
        return apiResponse.validationErrorWithData(res, 'Server error.', error.message);
    }
}

const login = async(req, res, next) => 
{
    try {
        const { email, password } = req.body
        console.log("🚀", email, password);
        const user = await User.findByCredentials(email, password)
        if (!user) 
        {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        console.log("🚀", user, token);
        return apiResponse.successResponseWithData(res, 'Success', { user, token });
    } catch (error) {
        res.status(400).send(error)
    }
}

const userProfile = async(req, res) => 
{
    const user = req.user;
    return apiResponse.successResponseWithData(res, "Success", { user });
}

module.exports = {
    registerUser: registerUser,
    login: login,
    userProfile: userProfile
}