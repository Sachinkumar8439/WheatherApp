const User = require("../Models/usermodel");
const islogin = async (req, res, next) => {
    try {
      if (!req.session.user) {
        return res.redirect("/"); // Redirect to login if not logged in
      }
      next();
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error auth");
    }
  };
  
  const islogout = async (req, res, next) => {
    try {
      if (req.session.user) {
        return res.redirect("/watch-wheather"); 
      }
      next();
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error auth");
    }
  };


 


module.exports = {
    islogin,
    islogout,
  }