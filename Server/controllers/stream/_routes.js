const express = require('express');
const auth = require('../../middelwares/auth');
const {generateStreamToken} = require("../stream/tokenProvider")
const router = express.Router();

router.get("/stream-token", auth, generateStreamToken);

module.exports = router;