const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.send(200);
})

module.exports = router;
