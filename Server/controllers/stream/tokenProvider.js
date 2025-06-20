const {StreamClient} = require("@stream-io/node-sdk")
const User = require('../../model/schema/user')

async function generateStreamToken (req, res) {
    try{
        const user = req.user;
        if(!user){
            return res.status(400).json({ message: "Unauthorized" });
        }

        const userDetails = await User.findOne({_id: user.userId})
        if(!userDetails){
            return res.status(404).json({ message: "User not found" });
        }

        const apiKey = process.env.STREAM_API_KEY;
        const secret = process.env.STREAM_SECRET_KEY;

        if(!apiKey){
            return res.status(401).json({ message: "No API Key" });
        }

        if(!secret){
            return res.status(401).json({ message: "No Secret" });
        }

        const client = new StreamClient(apiKey, secret);

        const expTime = Math.round(new Date().getTime() / 1000) + 60 * 60;

        const issuedAt = Math.floor(Date.now() / 1000) - 60;
        const token = client.generateUserToken({
            user_id: userDetails._id,
            exp: expTime,
            validity_in_seconds: issuedAt,
        });

        return res.status(200).json({streamToken: token});
    }catch(err){
        return res.status(500).json({ err });
    }
}

module.exports = {generateStreamToken};