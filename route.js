const express = require("express")
const {AddSchool,GetSchool,EditSchool,DeleteSchool} = require("./controller")


const router = express.Router();

router.post("/addSchool", AddSchool);
router.post("/editSchool", EditSchool);
router.post("/deleteSchool", DeleteSchool);
router.get("/getSchool", GetSchool);


module.exports = router