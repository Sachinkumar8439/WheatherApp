const express = require("express");
const router = express.Router();
const usercontroller = require("../Controllers/usercontroller")
const session = require("express-session");
require('dotenv').config();
const auth = require("../middlewares/auth")

const { SESSION_SECRET } = process.env;
router.use(
    session({
      secret: SESSION_SECRET,
      resave: false, 
      saveUninitialized: false, 
      cookie: { secure: false }, 
    })
  );

router.get("/",auth.islogout,usercontroller.loadlogin);
router.post("/login",usercontroller.handlelogin);

router.get("/signup",usercontroller.loadsignup);
router.post("/signup",usercontroller.validate);

router.post("/varification",usercontroller.handlesignup);



router.get("/watch-wheather",auth.islogin,usercontroller.loadmain);

router.post("/current-wheather",usercontroller.fetchdata);











module.exports = router;