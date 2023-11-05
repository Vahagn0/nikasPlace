const express = require('express');
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

const getCustomerByPersonalCode = async (req, res, next) => {
    try {
        let customer = await Customer.findOne({personalCode : req.params.personalCode}) 
        if (customer) {
            return res.status(200).json({
                'message': `customer with code ${req.params.personalCode} fetched successfully`,
                'data': customer
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No customer found in the system'
        });

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const createCustomer = async (req, res, next) => {
    try {
        const dateObj = new Date();
        let day = ("0" + dateObj.getDate()).slice(-2);
        let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
        let year = dateObj.getFullYear();
        let hours = dateObj.getHours();
        let minutes = dateObj.getMinutes();
        let time = hours + ":" + minutes;

        const 
        {
            name,
            surname,
            phoneNumber,
            mail,
            birthDate,
            personalCode,
            currentAboniment,
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
                'description': 'surname is required',
                'field': 'surname'
            });
        }

        if (phoneNumber === undefined || phoneNumber === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'phoneNumber is required',
                'field': 'phoneNumber'
            });
        }

        if (mail === undefined || mail === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'mail is required',
                'field': 'mail'
            });
        }

        if (birthDate === undefined || birthDate === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'birthDate is required',
                'field': 'birthDate'
            });
        }

        if (personalCode === undefined || personalCode === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'personalCode is required',
                'field': 'personalCode'
            });
        }

        if (currentAboniment === undefined || currentAboniment === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'currentAboniment is required',
                'field': 'currentAboniment'
            });
        }

        if (visitsLeft === undefined || visitsLeft === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'visitsLeft is required',
                'field': 'visitsLeft'
            });
        }

        if (visits === undefined || visits === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'visits is required',
                'field': 'visits'
            });
        }

        const aboniments = [{name: currentAboniment, day: day,month: month,year: year,time:time}]

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
                'message': 'customer created successfully',
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

const addVisit = async (req, res, next) => {
    try {
        const dateObj = new Date();
        let day = ("0" + dateObj.getDate()).slice(-2);
        let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
        let year = dateObj.getFullYear();
        let hours = dateObj.getHours();
        let minutes = dateObj.getMinutes();
        let time = hours + ":" + minutes;

        let customer = await Customer.findOne({personalCode : req.body.personalCode})

        const updatedVisits = [{day:day,month:month,year:year,time:time},...customer.visits]

        if(customer.visitsLeft > 0){

            let temp = {
                visitsLeft: customer.visitsLeft - 1,
                visits: updatedVisits
            }

            const updatedCustomer = await Customer.findOneAndUpdate({personalCode : req.body.personalCode}, temp, {
                new: true
            });

            if (updatedCustomer) {
                return res.status(200).json({
                    'message': 'product updated successfully',
                    'data': updatedCustomer
                });
            } else {
                throw new Error('something went worng');
            }
        }else{
            return res.status(400).json({
                'code': 'noVisit',
                'description': 'something went wrong, Please try again'
            });
        } 

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const findByName = async (req,res,next) => {
    try{
        const {name,surname} = req.body
        console.log("name",name,"surname",surname)
        if(name && surname){
            let customer = await Customer.find({name : name, surname: surname})
            if (customer[0]) {
                return res.status(200).json({
                    'message': 'customer found',
                    'data': customer
                });
            } else if(name){
                let customer = await Customer.find({name : name})
                if (customer[0]) {
                    return res.status(200).json({
                        'message': 'customer found',
                        'data': customer
                    });
                }else if(surname){
                    let customer = await Customer.find({surname : surname})
                    if (customer[0]) {
                        return res.status(200).json({
                            'message': 'customer found',
                            'data': customer
                        });
                    } else {
                        throw new Error('something went worng');
                    }
                }
            }
        }else if(name){
            let customer = await Customer.find({name : name})
            if (customer[0]) {
                return res.status(200).json({
                    'message': 'customer found',
                    'data': customer
                });
            } else {
                throw new Error('something went worng');
            }
        }else if(surname){
            let customer = await Customer.find({surname : surname})
            if (customer[0]) {
                return res.status(200).json({
                    'message': 'customer found',
                    'data': customer
                });
            } else {
                throw new Error('something went worng');
            }
        }
    }catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const getStatistics = async (req,res,next) => {
    try{
        const {day,month,year} = req.body

        let customers = await Customer.find()
        if(day && month && year){

            const found =  customers.map((customer)=>{
                const condition = day == customer.visits.day && month == customer.visits.month && year === customer.visits.year
                if(condition){
                    return customer
                }
            })

            console.log(found,"foundddddd")

            if ("something") {
                return res.status(200).json({
                    'message': 'customer found',
                    'data': customer
                });
                } else {
                    throw new Error('something went worng');
                }
            }
        }catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

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
    getCustomerByPersonalCode: getCustomerByPersonalCode,
    createCustomer: createCustomer,
    addVisit: addVisit,
    findByName: findByName,
    getStatistics: getStatistics
    // deleteProduct: deleteProduct
}