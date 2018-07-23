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
                message: 'Data not found',
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
                message: 'User is not found',
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
            message: 'İşlem Başarısız' + err,
            data: null
        });
    });
});

module.exports = router;