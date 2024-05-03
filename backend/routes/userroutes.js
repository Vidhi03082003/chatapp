const express=require('express');
const {getUsersForSidebar}=require('../controllers/usercontroller')
const {protectRoute}=require("../middleware/protectRoute")

const router=express.Router();

router.post("/",protectRoute,getUsersForSidebar)



module.exports = router;