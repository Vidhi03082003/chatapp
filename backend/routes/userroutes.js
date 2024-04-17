const express=require('express');
const {getUsersForSidebar}=require('../controllers/usercontroller')
const {protectRoute}=require("../middleware/protectRoute")

const router=express.Router();

router.get("/",protectRoute,getUsersForSidebar)



module.exports = router;