import React, {useState} from 'react';
import {
    CallControls,
    CallingState,
    CallParticipantsList, CallStatsButton,
    PaginatedGridLayout,
    SpeakerLayout,
    useCallStateHooks
} from "@stream-io/video-react-sdk";
import Spinner from "@/components/spinner/Spinner";
import {useNavigate} from "react-router-dom";
import {FaUsers} from "react-icons/fa6";
import EndCallButton from "@/meeting/EndCallButton";

const layoutTypes = [
    {
        type: "Grid",
        action: "grid"
    },
    {
        type: "Speaker Left",
        action: "speaker-left"
    },
    {
        type: "Speaker Right",
        action: "speaker-right"
    }
]


function MeetingRoom(props) {
    const [layout, setLayout] = useState("speaker-left")
    const [showParticipants, setShowParticipants] = useState(false)
    const navigate = useNavigate();

    const {useCallCallingState} = useCallStateHooks();
    const callingState = useCallCallingState();

    if(callingState !== CallingState.JOINED){
        return <Spinner/>
    }

    const CallLayout = () => {
        switch(layout){
            case "grid":
                return <PaginatedGridLayout></PaginatedGridLayout>

            case "speaker-left":
                return <SpeakerLayout participantsBarPosition="right"></SpeakerLayout>

            default:
                return <SpeakerLayout participantsBarPosition="left"></SpeakerLayout>
        }
    }
    return (
        <section className="call-section">
            <div className="call-layout-wrapper">
                <div className="call-layout-inner">
                    <CallLayout />
                </div>
                <div className={`participants-list ${showParticipants ? "show-block" : ""}`}>
                    <CallParticipantsList onClose={() => setShowParticipants(false)} />
                </div>
            </div>

            <div className='call-controls-bar'>
                <CallControls onLeave={() => navigate("/")} />
                {/*<DropdownMenu>*/}
                {/*    <div>*/}
                {/*        <DropdownMenuTrigger className="dropdown-trigger">*/}
                {/*            <LayoutList size={20} className='icon-white' />*/}
                {/*        </DropdownMenuTrigger>*/}
                {/*    </div>*/}
                {/*    <DropdownMenuContent className="dropdown-content">*/}
                {/*        {*/}
                {/*            layoutTypes.map((item, i) => (*/}
                {/*                <div key={i}>*/}
                {/*                    <DropdownMenuItem onClick={() => setlayout(item.action as CallLayoutType)} className="dropdown-item">*/}
                {/*                        {item.type}*/}
                {/*                    </DropdownMenuItem>*/}
                {/*                </div>*/}
                {/*            ))*/}
                {/*        }*/}
                {/*    </DropdownMenuContent>*/}
                {/*</DropdownMenu>*/}
                <CallStatsButton />
                <button onClick={() => setShowParticipants((prev) => !prev)}>
                    <div className='dropdown-trigger'>
                        <FaUsers size={20} className='icon-white' />
                    </div>
                </button>
                <EndCallButton />
            </div>
        </section>

    );
}

export default MeetingRoom;