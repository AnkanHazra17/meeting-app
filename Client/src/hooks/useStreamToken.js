import {useEffect, useState} from "react";
import {getApi} from "@/services/api";

export const useStreamToken = () => {
    const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const getToken = async () => {
        setIsLoading(true);
        try {
            const response = await getApi("api/stream/stream-token");
            if(response.status !== 200) {
                throw new Error("unable to get stream-token");
            }
            setToken(response.data.streamToken);
        } catch (error) {
            throw error;
        }finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getToken();
    }, []);

    return {token, isLoading};
}