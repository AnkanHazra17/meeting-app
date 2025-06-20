import React from 'react';
import {useNavigate} from "react-router-dom";
import {useCall, useCallStateHooks} from "@stream-io/video-react-sdk";
import {Button} from "@chakra-ui/react";

function EndCallButton() {
    const navigate = useNavigate();
    const call = useCall();
    const {useLocalParticipant} = useCallStateHooks()
    const localParticipant = useLocalParticipant();

    const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId === call?.state.createdBy.id;

    if(!isMeetingOwner) return null;

    return (
        <Button
            fontSize="sm"
            variant="brand"
            fontWeight="500"
            onClick={async () => {
                await call.endCall();
                navigate("/")
            }}
        >
            End call for everyone
        </Button>
    );
}

export default EndCallButton;