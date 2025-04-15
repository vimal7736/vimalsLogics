import { useEffect, useState } from "react"
import axios from "axios"


export const useFetch = (url) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(url);
            setData(response.data);
            setError(null);
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    useEffect((
        fetchData()
    ), [data])


    return {
        loading,
        data,
        error,
        fetchData
    
    }
}

