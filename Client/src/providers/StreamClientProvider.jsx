import React, {useEffect, useState} from 'react';
import {constant} from "@/constant";
import {StreamVideo, StreamVideoClient} from "@stream-io/video-react-sdk";
// import {StreamClient} from "@stream-io/node-sdk";
import Spinner from "@/components/spinner/Spinner";
import {getApi} from "@/services/api";

const {streamApiKey, streamSecretKey} = constant;
const getToken = async () => {
    try {
        const response = await getApi("api/stream/stream-token");
        if(response.status !== 200) {
            throw new Error("unable to get stream-token");
        }
        return response.streamToken;
    } catch (error) {
        throw error;
    }
}
function StreamClientProvider({children}) {
    const [videoClient, setVideoClient] = useState(null);

    const userId = crypto.randomUUID();

    useEffect(() => {

        if(!streamApiKey){
            throw new Error("Stream API Key missing")
        }
        const client = new StreamVideoClient({
            apiKey: streamApiKey,
            user: {
                id: userId,
                name: userId,
            },
            tokenProvider: getToken,
        })

        setVideoClient(client);

    }, [userId]);

    if(!videoClient){
        return (
            <Spinner></Spinner>
        )
    }
    return (
        <StreamVideo client={videoClient}>
            {children}
        </StreamVideo>
    );
}

export default StreamClientProvider;