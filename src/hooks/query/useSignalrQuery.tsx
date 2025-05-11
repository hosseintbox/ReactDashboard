import { useState, useEffect, useCallback } from "react";
import * as signalR from "@microsoft/signalr";

interface UseSignalRQueryOptions<T> {
    fetchFunction: () => Promise<T>;
    hubUrl: string;
    eventName: string;
}

const useSignalRQuery = <T,>({
                                 fetchFunction,
                                 hubUrl,
                                 eventName,
                             }: UseSignalRQueryOptions<T>) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const updateData = useCallback((newData: T) => {
        setData((prevData) => {
            return JSON.stringify(prevData) === JSON.stringify(newData) ? prevData : newData;
        });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetchFunction();
                setData(response);
            } catch (err: any) {
                setError(err.message || "خطایی رخ داده است");
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        const connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .withAutomaticReconnect()
            .build();

        connection
            .start()
            .then(() => console.log("✅ SignalR Connected"))
            .catch((err: any) => console.error("❌ SignalR Connection Error: ", err));

        connection.on(eventName, updateData);

        return () => {
            connection.stop();
        };
    }, [hubUrl, eventName, fetchFunction, updateData]);

    return { data, loading, error };
};

export default useSignalRQuery;
