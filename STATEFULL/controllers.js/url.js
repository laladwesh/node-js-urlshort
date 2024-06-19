const shortid = require('shortid')
const URL = require('../model/url.js');
// const { link } = require('../routes/url.js');
async function generateNewShortUrl(req,res){
    const body  = req.body
    console.log(req.user._id)
    if(!body.url) return res.status(400).json({error:'URL IS REQUIRED'})
    const shortId = shortid();
    await URL.create({
        shortID: shortId,
        redirectURL:body.url,
        visitHistory:[],
        createdBy:req.user._id
    })
    return res.render("home" , {
        id:shortId ,
    })
}
async function accesstheshortID(req,res){
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate(
        {
            shortID
        },
        {
            $push: {
                visitHistory:{
                    timestamp: Date.now()
                }
            }
        }
    )
    linkedin = entry.redirectURL;
    res.redirect(linkedin)
}
async function handleAnalytics(req , res){
    const shortID = req.params.shortID;
    const result = await URL.findOne({shortID});
    return res.json({ totalClicks:result.visitHistory.length , analytics:result.visitHistory})
}
module.exports = {
    generateNewShortUrl,
    accesstheshortID,
    handleAnalytics
}