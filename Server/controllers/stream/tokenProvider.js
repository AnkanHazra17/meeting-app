const {StreamClient} = require("@stream-io/node-sdk")
const apiKey = process.env.STREAM_API_KEY;
const secret = process.env.STREAM_SECRET_KEY;

export function generateStreamToken (req, res) {
    try{
        const userId = req.params.id;
        if(!userId){
            res.status(400).json({ message: "Unauthorized" });
        }

        if(!apiKey){
            res.status(401).json({ message: "No API Key" });
        }

        if(!secret){
            res.status(401).json({ message: "No Secret" });
        }

        const client = new StreamClient(apiKey, secret);
        const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

        const iat = Math.floor(Date.now() / 1000) - 60;
        const token = client.generateCallToken(userId, exp, iat);

        res.status(200).json({streamToken: token});
    }catch(err){
        res.status(500).json({ err });
    }
}