import React, {useState} from 'react';
import {Button, Center} from "@chakra-ui/react";
import {useStreamVideoClient} from "@stream-io/video-react-sdk";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify"
import Spinner from "@/components/spinner/Spinner";

function StartMeeting() {
    const user = JSON.parse(localStorage.getItem("user"))
    const client = useStreamVideoClient();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const createMeeting = async () => {
        if(!client || !user) return;
        setLoading(true);
        try {
            const id = crypto.randomUUID();
            const call = client.call("default", id);

            if(!call){
                throw new Error("Failed To Create Call");
            }

            const startsAt = new Date(Date.now()).toISOString();
            const description = "Instant Meeting";

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })

            navigate(`/meeting/${call.id}`)

            toast.success("Meeting Created");
        } catch (error) {
            console.log(error);
            toast.error("Failed to create meeting")
        }finally {
            setLoading(false);
        }
    };

    return (
        <Center height="100vh" width="100%">
            <Button
                fontSize="sm"
                variant="brand"
                fontWeight="500"
                onClick={createMeeting}
                disabled={loading}
            >
                {
                    loading ? <Spinner/> : "Start a meeting"
                }
            </Button>
        </Center>
    )
}

export default StartMeeting;