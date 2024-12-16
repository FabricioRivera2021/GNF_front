import { useEffect, useState } from 'react';
import { getCurrentSelectedNumber } from './apiService';

export const useCurrentNumber = () => {
    const [numero, setNumero] = useState(null);

    useEffect(() => {
        getCurrentSelectedNumber()
            .then(({ data }) => setNumero(data))
            .catch(console.error);
    }, []);

    return { numero, setNumero };
};