const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/getAll', (req, res) => {
    const promise = User.find({});
    promise.then((data) => {
        res.json({
            status: true,
            message: null,
            data: data
        });
    }).catch((err) => {
        res.json({
            status: false,
            message: err,
            data: null
        });
    });
});

router.get('/findById/:id', (req, res) => {
    const promise = User.findById(req.params.id);
    promise.then((data) => {
        if(!data){
            next({
                status: false,
                message: req.app.get('api_language_json')['USER_NOT_FOUND'],
                data: null
            });
        }
        res.json({
            status: true,
            message: null,
            data: data
        });
    }).catch((err) => {
        res.json({
            status: false,
            message: err,
            data: null
        });
    });
});

router.delete('/:id', (req, res, next) => {
    const promise = User.findByIdAndRemove(req.params.id);
    promise.then((id) => {
        if (!id) {
            next({
                status: false,
                message: req.app.get('api_language_json')['USER_NOT_FOUND'],
                data: null
            });
        }
        res.json({
            status: true,
            message: null,
            data: id
        });
    }).catch((err) => {
        res.json({
            status: false,
            message: req.app.get('api_language_json')['FAILED'] + err,
            data: null
        });
    });
});

module.exports = router;