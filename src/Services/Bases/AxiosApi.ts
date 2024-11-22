import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from '../../Commons/BaseUrlAPI';

/**
 * Función personalizada para realizar solicitudes con Axios.
 * @param {string} endpoint - Endpoint relativo (por ejemplo, /users).
 * @param {AxiosRequestConfig} options - Opciones para el método Axios (headers, body, etc.).
 * @returns {Promise<any>} - Promesa con la respuesta JSON o un error.
 */
async function fetchData(endpoint: string, options: AxiosRequestConfig = {}): Promise<any> {
    const url = `${BASE_URL}${endpoint}`;
    console.log('data');
    console.log(url);
    try {
        const response = await axios({ url, ...options, headers: { 'Content-Type': 'application/json', ...options.headers, }, });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || 'Error en la solicitud';
            console.error('Error en get data:', message);
            throw new Error(message);
        } else {
            console.error('Error en get data:', error);
            throw error;
        }
    }
}

const apiService = {
    get: (endpoint: string) => fetchData(endpoint, { method: 'GET' }),
    post: (endpoint: string, body: any) => fetchData(endpoint, { method: 'POST', data: body }),
    put: (endpoint: string, body: any) => fetchData(endpoint, { method: 'PUT', data: body }),
    delete: (endpoint: string) => fetchData(endpoint, { method: 'DELETE' }),
};

export default apiService;
