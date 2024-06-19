const express  = require('express');
const path  = require('path');
const cookieParser = require('cookie-parser')

const {connectToMongodb} = require('./connect.js')


const URL = require('./model/url.js')
const urlRoute = require('./routes/url')
const staticRouter = require('./routes/staticRouter.js')
const userRoute = require('./routes/user.js')
const app = express();
const PORT = 8001;
const {restrictedToLoggedInUserOnly , checkAuth} = require('./middlewares/auth.js')
connectToMongodb('mongodb://127.0.0.1:27017/short-url')
.then(()=>{
    console.log("MongoDB Connected")
})
app.set("view engine" , "ejs")
app.set("views" , path.resolve("./views"))
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use('/url' ,restrictedToLoggedInUserOnly, urlRoute);
app.use('/user' , userRoute);
app.use("/" , checkAuth, staticRouter)
app.listen(PORT , () =>{
    console.log(`Server Listening At Port ${PORT}`);
})