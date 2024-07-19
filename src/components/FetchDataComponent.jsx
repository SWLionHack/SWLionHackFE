import React, { useEffect, useState } from 'react';

const FetchDataComponent = () => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // API 호출 함수
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}`); // 백엔드 API URL로 변경
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [apiBaseUrl]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Fetched Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default FetchDataComponent;
