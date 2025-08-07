const express= require('express')
const router= express.Router();
const{createRoom,getRoomBYroomId, UpdateRoomById,getUserByName ,login, forgotPassword}= require('./user.controller');
const { checkToken } = require('../auth/token_validation');
const {createValidation}=require('../auth/authvalidation')

router.post('/roomc',createRoom);
router.get('/:id',checkToken,getRoomBYroomId)
router.patch('/update/:id',UpdateRoomById)
router.post('/login',login)
router.post('/forgot-password', forgotPassword)



module.exports=router;