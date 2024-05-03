const express=require('express');
const {sendMessage,getMessages}=require('../controllers/messagecontroller')
const {protectRoute}=require("../middleware/protectRoute")

const router=express.Router();

router.post("/:id",protectRoute,getMessages)
router.post("/send/:id",protectRoute,sendMessage)


module.exports = router;