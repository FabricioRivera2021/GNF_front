import axiosClient from "../axiosCustom";
const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAllNumbers = (filter) => axiosClient.get(
    `${API_URL}/allNumbers/${filter}`
);

export const fetchPausedNumbers = () => axiosClient.get(
    'http://localhost:8000/api/filterPausedNumbers'
);

export const fetchCancelNumbers = () => axiosClient.get(
    'http://localhost:8000/api/filterCancelNumbers'
);

export const getCurrentSelectedNumber = () => axiosClient.get(
    'http://localhost:8000/api/getCurrentSelectedNumber'
);

export const fetchAllEstados = () => axiosClient.get(
    `${API_URL}/allEstados`
);

export const assignNumberToUser = (id, paused, canceled) => axiosClient.post(
    'http://localhost:8000/api/asignNumberToUser', { id: id, paused: paused, canceled: canceled }
);

export const setNextState = async (number) => {
    try {
        const response = await axiosClient.post(`${API_URL}/setNextState`, { numero: number });
        console.log(response.data); // Handle the successful response here
        return response.data;
    } catch (error) {
        console.error("Error in setNextState:", error);
        throw error;
    }
};

export const setPause = (number) => axiosClient.post(
    'http://localhost:8000/api/setPause', { numero: number }
);

export const setCancel = (number) => axiosClient.post(
    'http://localhost:8000/api/setCanceled', { numero: number }
);

export const fetchDerivateOptions = (number) => axiosClient.get(
    'http://localhost:8000/api/derivateTo', { params: { number } }
);

export const derivateToPosition = (number, position) => axiosClient.post(
    'http://localhost:8000/api/derivateToPosition', { number, position }
);