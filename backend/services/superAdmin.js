const SuperAdmin = require('../models/superAdmin');
const apiResponse = require("../helpers/apiResponse");
const credentials = require('../configs/credentials/');

const login = async(req, res, next) => 
{
    try {
        const { username, password } = req.body
        console.log("🚀", username, password);
        if (credentials.username != username || credentials.password != password) {
            console.log("Wrong username or password");
            return apiResponse.notFoundResponse(res, 'Invalid username or password');
        }
        const superAdmin = await SuperAdmin.findByCredentials(username, password);
        if (!superAdmin) 
        {
            console.log("Super admin not found");
            const admin = new SuperAdmin({ username }); 
            await admin.save();
            const token = await admin.generateAuthToken();
            return apiResponse.successResponseWithData(res, 'Success', { admin, token });
        }
        const token = await superAdmin.generateAuthToken()
        console.log("🚀", superAdmin, token);
        return apiResponse.successResponseWithData(res, 'Success', { superAdmin, token });
    } catch (error) {
        return apiResponse.validationErrorWithData(res, error.message);
    }
}

module.exports = {
    login: login
}