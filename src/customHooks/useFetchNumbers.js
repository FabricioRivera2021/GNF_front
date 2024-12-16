import { useEffect, useState } from 'react';
import { fetchAllNumbers, fetchPausedNumbers, fetchCancelNumbers } from './apiService';

export const useFetchNumbers = (filterPaused, filterCancel, selectedFilter) => {
    const [numeros, setNumeros] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        let fetchFunction;

        if (filterPaused) {
            fetchFunction = fetchPausedNumbers;
        } else if (filterCancel) {
            fetchFunction = fetchCancelNumbers;
        } else {
            fetchFunction = () => fetchAllNumbers(selectedFilter);
        }

        fetchFunction()
            .then(({ data }) => setNumeros(data))
            .catch(setError)
            .finally(() => setIsLoading(false));
    }, [filterPaused, filterCancel, selectedFilter]);

    return { numeros, isLoading, error };
};