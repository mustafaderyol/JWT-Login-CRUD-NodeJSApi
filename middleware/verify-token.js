const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;

    if (token) {
        jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
            if (err) {
                res.json({
                    status: false,
                    message: req.app.get('api_language_json')['FAIL_TOKEN'],
                    data: null
                });
            } else {
                res.decode = decoded;
                next();
            }
        });
    } else {
        res.json({
            status: false,
            message: req.app.get('api_language_json')['NOT_EXISTS_TOKEN'],
            data: null
        });
    }
};