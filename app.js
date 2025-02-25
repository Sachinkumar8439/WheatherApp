const express = require("express");
const app = express();
const path = require("path");
const port = 8000;
const mongoose = require("mongoose")

mongoose
  .connect("mongodb://localhost:27017/API_integration_weather_news_APP", {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
  
app.set('view engine' , "ejs");
app.set('views',path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended:false})
)
app.use(express.static(path.resolve("./public")));


const router = require("./routes/router");
// const { use } = require("./routes/router");

app.use("/",router);




app.listen(port,()=>{
   console.log(`port is running on PORT:${port}`)
})