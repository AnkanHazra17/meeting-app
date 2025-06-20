import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useGetCallById} from "@/hooks/useGetCallById";
import Spinner from "@/components/spinner/Spinner";
import {StreamCall, StreamTheme} from "@stream-io/video-react-sdk";
import MeetingSetUp from "@/meeting/MeetingSetUp";
import MeetingRoom from "@/meeting/MeetingRoom";

function MeetingLayout() {
    const {meetingId} = useParams();
    const {call, isCallLoading} = useGetCallById(meetingId);
    const [isSetUpComplete, setIsSetUpComplete] = useState(false);

    if(isCallLoading) return <Spinner/>

    return (
        <div className="meeting-layout-container">
            <StreamCall call={call}>
                <StreamTheme>
                    {
                        !isSetUpComplete ? (
                            <MeetingSetUp setIsSetUpComplete={setIsSetUpComplete}></MeetingSetUp>
                        ) : (
                            <MeetingRoom></MeetingRoom>
                        )
                    }
                </StreamTheme>
            </StreamCall>
        </div>
    );
}

export default MeetingLayout;