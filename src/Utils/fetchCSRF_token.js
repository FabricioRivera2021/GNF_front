import axios from 'axios';

const fetchCsrfToken = async () => {
    try {
        const response = await axios.get('http://localhost:8000/csrf-token');
        const csrfToken = response.data.csrfToken;
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
    }
};

export default fetchCsrfToken;