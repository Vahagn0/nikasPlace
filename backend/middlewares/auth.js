const jwt = require('jsonwebtoken');
const User = require('../models/user');
const db = require('../configs/database');
const apiResponse = require('../helpers/apiResponse')

const auth = async(req, res, next) => 
{     
    try 
    {
        console.log("🚀 auth.js");
        const token = req.header('Authorization').replace('Bearer ', ''); 
        const data = jwt.verify(token, db.secret);
        const user = await User.findOne({ _id: data._id, 'token': token });
        if (!user) 
        {
            return apiResponse.unauthorizedResponse(res, 'Not authorized to access this resource');
        }
        req.user = user;
        req.token = token;
        next();
    } 
    catch (error) 
    {
        return apiResponse.unauthorizedResponse(res, 'Not authorized to access this resource');
    }

}
module.exports = auth;