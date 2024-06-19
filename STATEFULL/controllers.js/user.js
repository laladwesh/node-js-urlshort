const {v4: uuidv4} = require('uuid')
const user  = require('../model/user')
const{setUser} = require('../service/auth')
async function handleUserSignup(req,res){
    const {name,email,password} = req.body;
    await user.create({
        name,
        email,
        password
    });
    return res.render("login")
}
async function handleUserLogin(req,res){
    const {email,password} = req.body;
    const User = await user.findOne({email,password})
    if(!User) {
        return res.render("login" , {
    error:"INVALID CREDENTIALS"})
    }

    const token = setUser(User)
    res.cookie("uid" , token)
    return res.redirect("/")
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}