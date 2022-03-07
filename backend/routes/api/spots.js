const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot ,Image} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();


router.get('/', asyncHandler(async(req,res)=>{

    const spots = await Spot.findAll();

    res.json({spots});
}))









module.exports = router;