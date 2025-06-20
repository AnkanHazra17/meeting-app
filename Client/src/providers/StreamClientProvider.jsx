import React, {useEffect, useState} from 'react';
import {constant} from "@/constant";
import {StreamVideo, StreamVideoClient} from "@stream-io/video-react-sdk";
import Spinner from "@/components/spinner/Spinner";
import {getApi} from "@/services/api";
import {useStreamToken} from "@/hooks/useStreamToken";

const {streamApiKey} = constant;

function StreamClientProvider({children}) {
    const user = JSON.parse(localStorage.getItem("user"))

    const {token, isLoading} = useStreamToken();

    const client = new StreamVideoClient({
        apiKey: streamApiKey,
        user: {
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            image: `https://api.dicebear.com/9.x/initials/svg?seed=${user.firstName}`
        },
        token: token,
    })

    if(!client || isLoading){
        return (
            <Spinner></Spinner>
        )
    }
    return (
        <StreamVideo client={client}>
            {children}
        </StreamVideo>
    );
}

export default StreamClientProvider;