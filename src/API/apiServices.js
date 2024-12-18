import axios from 'axios';
import axiosClient from '../axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAllNumbers = (filter) => axios.get(
    `${API_URL}/allNumbers/${filter}`
);

export const fetchPausedNumbers = () => axios.get(
    'http://localhost:8000/api/filterPausedNumbers'
);

export const fetchCancelNumbers = () => axios.get(
    'http://localhost:8000/api/filterCancelNumbers'
);

export const getCurrentSelectedNumber = () => axios.get(
    'http://localhost:8000/api/getCurrentSelectedNumber'
);

export const fetchAllEstados = () => axios.get(
    `${API_URL}/allEstados`
);

export const assignNumberToUser = (id, paused, canceled) => axios.post(
    'http://localhost:8000/api/asignNumberToUser', { id: id, paused: paused, canceled: canceled }
);

export const setNextState = async (number) => {
    try {
        const data = await setNextState(number);
        console.log(data); // Handle the successful response here
    } catch (error) {
        console.error("Error in handleSetNextState:", error);
    }
};

export const setPause = (number) => axios.post(
    'http://localhost:8000/api/setPause', { numero: number }
);

export const setCancel = (number) => axios.post(
    'http://localhost:8000/api/setCanceled', { numero: number }
);

export const fetchDerivateOptions = (number) => axios.get(
    'http://localhost:8000/api/derivateTo', { params: { number } }
);

export const derivateToPosition = (number, position) => axios.post(
    'http://localhost:8000/api/derivateToPosition', { number, position }
);