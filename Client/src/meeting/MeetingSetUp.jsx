import React, {useEffect, useState} from 'react';
import {DeviceSettings, useCall, VideoPreview} from "@stream-io/video-react-sdk";
import {Button} from "@chakra-ui/react";

function MeetingSetUp({setIsSetUpComplete}) {
    const [isMicCamToggeledOn, setIsMicCamToggeledOn] = useState(false);
    const call = useCall();

    if(!call){
        throw new Error("useCall must be used in stream call component");
    }

    useEffect(() => {
        if(isMicCamToggeledOn){
            call?.camera.disable();
            call?.microphone.disable();
        }else{
            call?.camera.enable();
            call?.microphone.enable();
        }
    }, [isMicCamToggeledOn, call?.camera, call?.microphone])
    return (
        <div className="meeting-setup-container">
            <h1 className="meeting-setup-title">Setup</h1>
            <div className="meeting-setup-video">
                <VideoPreview />
            </div>
            <div className="meeting-setup-controls">
                <label className='meeting-setup-checkbox-label'>
                    <input
                        type="checkbox"
                        checked={isMicCamToggeledOn}
                        onChange={(e) => setIsMicCamToggeledOn(e.target.checked)}
                    />
                    Join with mic and camera off
                </label>
                <DeviceSettings />
            </div>
            <Button
                fontSize="sm"
                variant="brand"
                fontWeight="500"
                onClick={() => {
                    call.join();
                    setIsSetUpComplete(true);
                }}
            >
                Join Meeting
            </Button>
        </div>

    );
}

export default MeetingSetUp;