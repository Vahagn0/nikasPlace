const express = require('express');;
const Customer = require("../models/custumer")

const getCustomer = async (req, res, next) => {
    try {

        let customers = await Customer.find({});

        if (customers.length > 0) {
            return res.status(200).json({
                'message': 'products fetched successfully',
                'data': customers
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No customers found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

// const getProductById = async (req, res, next) => {
//     try {
//         let product = await Product.findById(req.params.id);
//         if (product) {
//             return res.status(200).json({
//                 'message': `product with id ${req.params.id} fetched successfully`,
//                 'data': product
//             });
//         }

//         return res.status(404).json({
//             'code': 'BAD_REQUEST_ERROR',
//             'description': 'No products found in the system'
//         });

//     } catch (error) {

//         return res.status(500).json({
//             'code': 'SERVER_ERROR',
//             'description': 'something went wrong, Please try again'
//         });
//     }
// }

const createCustomer = async (req, res, next) => {
    try {
        const 
        {
            name,
            surname,
            phoneNumber,
            mail,
            birthDate,
            personalCode,
            currentAboniment,
            aboniments,
            visitsLeft,
            visits,
        } = req.body;

        if (name === undefined || name === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'name is required',
                'field': 'name'
            });
        }

        if (surname === undefined || surname === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'name is required',
                'field': 'name'
            });
        }

        if (phoneNumber === undefined || phoneNumber === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'name is required',
                'field': 'name'
            });
        }

        if (mail === undefined || mail === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'name is required',
                'field': 'name'
            });
        }

        if (birthDate === undefined || birthDate === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'name is required',
                'field': 'name'
            });
        }

        if (personalCode === undefined || personalCode === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'name is required',
                'field': 'name'
            });
        }

        if (currentAboniment === undefined || currentAboniment === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'name is required',
                'field': 'name'
            });
        }

        if (aboniments === undefined || aboniments === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'name is required',
                'field': 'name'
            });
        }

        if (visitsLeft === undefined || visitsLeft === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'name is required',
                'field': 'name'
            });
        }

        if (visits === undefined || visits === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'name is required',
                'field': 'name'
            });
        }

        const temp = {
            name: name,
            surname: surname,
            phoneNumber: phoneNumber,
            mail: mail,
            birthDate: birthDate,
            personalCode: personalCode,
            currentAboniment: currentAboniment,
            aboniments: aboniments,
            visitsLeft: visitsLeft,
            visits: visits
        }

        let newCustomer = await Customer.create(temp);

        if (newCustomer) {
            return res.status(201).json({
                'message': 'product created successfully',
                'data': newCustomer
            });
        } else {
            throw new Error('something went worng');
        }
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

// const updateProduct = async (req, res, next) => {
//     try {


//         const ProductId = req.params.id;

//         const {name,price,stock} = req.body;

//         if (name === undefined || name === '') {
//             return res.status(422).json({
//                 'code': 'REQUIRED_FIELD_MISSING',
//                 'description': 'name is required',
//                 'field': 'name'
//             });
//         }

//         if (price === undefined || price === '') {
//             return res.status(422).json({
//                 'code': 'REQUIRED_FIELD_MISSING',
//                 'description': 'price is required',
//                 'field': 'price'
//             });
//         }
//         if (stock === undefined || stock === '') {
//             return res.status(422).json({
//                 'code': 'REQUIRED_FIELD_MISSING',
//                 'description': 'stock is required',
//                 'field': 'stock'
//             });
//         }

//         if (price === undefined || price === '') {
//             return res.status(422).json({
//                 'code': 'REQUIRED_FIELD_MISSING',
//                 'description': 'price is required',
//                 'field': 'price'
//             });
//         }
//         if (stock === undefined || stock === '') {
//             return res.status(422).json({
//                 'code': 'REQUIRED_FIELD_MISSING',
//                 'description': 'stock is required',
//                 'field': 'stock'
//             });
//         }
//         const temp = {
//             name: name,
//             price: price,
//             stock: stock
//         }

//         let updateProduct = await Product.findByIdAndUpdate(ProductId, temp, {
//             new: true
//         });

//         if (updateProduct) {
//             return res.status(200).json({
//                 'message': 'product updated successfully',
//                 'data': updateProduct
//             });
//         } else {
//             throw new Error('something went worng');
//         }
//     } catch (error) {

//         return res.status(500).json({
//             'code': 'SERVER_ERROR',
//             'description': 'something went wrong, Please try again'
//         });
//     }
// }

// const deleteProduct = async (req, res, next) => {
//     try {
//         let product = await {Product}.findByIdAndRemove(req.params.id);
//         if (product) {
//             return res.status(204).json({
//                 'message': `product with id ${req.params.id} deleted successfully`
//             });
//         }

//         return res.status(404).json({
//             'code': 'BAD_REQUEST_ERROR',
//             'description': 'No users found in the system'
//         });

//     } catch (error) {

//         return res.status(500).json({
//             'code': 'SERVER_ERROR',
//             'description': 'something went wrong, Please try again'
//         });
//     }
// }

module.exports = {
    getCustomer: getCustomer,
    // getProductById: getProductById,
     createCustomer: createCustomer,
    // updateProduct: updateProduct,
    // deleteProduct: deleteProduct
}