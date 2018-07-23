let express = require('express');
let router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

router.post('/authenticate', function (req, res, next) {
    const {email, password} = req.body;

    User.findOne({
        email
    }, (err, user) => {
        if (err) {
            throw err;
        }
        if (!user) {
            res.json({
                status: false,
                message: 'Auth Fail, user not found',
                data: null
            });
        } else {
            bcrypt.compare(password, user.password).then((result) => {
                if (!result) {
                    res.json({
                        status: false,
                        message: 'Auth Fail, wrong password',
                        data: null
                    });
                } else {
                    const payload = {
                        email
                    };
                    const token = jwt.sign(payload, req.app.get('api_secret_key'), {
                        expiresIn: 720 // 12 saat
                    });

                    res.json({
                        status: true,
                        message: null,
                        data: {
                            token
                        }
                    });
                }
            });
        }
    });
});

router.post('/register', (req, res, next) => {
    const {email, password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        const user = new User({
            email: email,
            password: hash
        });
        const promise = user.save();
        promise.then((data) => {
            res.json({
                success: true,
                message: null,
                data: data
            });
        }).catch((err) => {
            res.json({
                success: false,
                message: "İşlem Başarısız: "+ err,
                data: null
            });
        });
    });
});

module.exports = router;
