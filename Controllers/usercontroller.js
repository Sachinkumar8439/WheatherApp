const cities = require('world-cities-json');
const run = require("../Controllers/functions")
const User = require("../Models/usermodel");
const bcrypt = require("bcrypt");
require('dotenv').config();
const axios = require("axios");
const { W_api } = process.env;
// const { json } = require('express');

const loadlogin = async (req, res) => {
  try {
    res.status(200).render("login");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send({ message: "Something went wrong on the server." });
  }
};

const loadsignup = async (req, res) => {
  try {
    console.log("point load signup");
    return res.render("signup");
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "inetrnal server error" });
  }
};

const validate = async(req,res)=>{
  try {
    const {name,email,password} =req.body;
    const user = await User.findOne({email});
    if(user)
    {
      return res.status(400).render("signup", { message: "email allready exist ?" });

    }
    else{
      const otp = run.genrateotp();
      const sent =  run.sendmail(email,otp);
      if(sent)
      {
        const userdata = {name,email,password,otp}
        req.session.userdata = userdata;
        return res.render('otppage');

      }
     return res.send("somthing enternal error in sending the mail please wait problem to be resolved");
    }
    
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error auth");
  }

}

const handlesignup = async (req, res) => {
  try {
    if (req.body) {
      const OTP = req.body.otp;
      // const {name,email,password} = req.session.userdata;
      const { name, email, password ,otp} = req.session.userdata;
      if(otp == OTP)
      {
        req.session.userdata = null;

        const found = await User.findOne({ email: email });
        if (!found) {
          const hashpassword = await bcrypt.hash(password, 10);
          
          const user = new User({
            name,
            email,
            password: hashpassword,
          });
          await user.save();
          req.session.user = user;
          req.session.new=true;
          return res.status(200).json({ success: true });
        } else {
          return res.status(404).render("signup", { message: "email allready exist ?" });
        }
      }
      else{
        return res.status(400).json({ success: false, message: 'OTP is required' });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error at login handling");
  }
};
const handlelogin = async (req, res) => {
  try {
    if(req.body)
    {
      const {email,password} = req.body;
      const user = await User.findOne({email});
      if(user)
      {
        const matchpassword = await bcrypt.compare(password,user.password);
        if(matchpassword)
        {
          req.session.user = user;
         return res.redirect('/watch-wheather');

        }
        else
        {
          return res.render('login',{message:"password is incorrect"});

        }

      }
      else
      {
       return res.render('login',{message:"email doesent exists ?"});
      }


    }


  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error at login handling");
  }
};

const loadmain = async(req,res)=>{
  try {
    if(req.session.user)
    {
     
     return res.render('main',{username:req.session.user.name,isnew:req.session.new});
    }
    else
    {
      res.redirect('/');
    }
    
  } catch (error) {
    console.log(error.message)
    res.status(500).send("internal server error at mainpage");
    
  }

}

const fetchdata = async(req,res)=>{
  try {
    const city = req.body.city;
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${W_api}&q=${city}&aqi=no`);
    console.log(response)

    if(response.status === 200)
    {
      const data = response.data;
      console.log(data);
      // console.log(data)
      res.status(200).render('main',{data,update:true,message:"sussefully updated data"})

    }
    else{
      console.log("city is invalid")
    }

    
  } catch (error) {
    console.log(error.message)
    res.status(500).render('main',{message:"enter a valid city name"});
  }
}

module.exports = {
  loadlogin,
  loadsignup,
  handlesignup,
  handlelogin,
  loadmain,
  fetchdata,
  validate,
};
