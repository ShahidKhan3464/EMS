import axios from 'axios';
import { getToken } from 'utils';

const { REACT_APP_BASE_URL } = process.env
const authToken = getToken()

class ApiClient {

    constructor() {
        this.client = axios.create({
            baseURL: REACT_APP_BASE_URL,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
                'ngrok-skip-browser-warning': 'ngrok-skip-browser-warning',
            },
        })
    }

    async get(endpoint, params) {
        const response = await this.client.get(endpoint, { params })
        return response
    }

    async post(endpoint, data) {
        const response = await this.client.post(endpoint, data)
        return response
    }

    async put(endpoint, data) {
        const response = await this.client.put(endpoint, data)
        return response
    }

    async delete(endpoint, data) {
        const response = await this.client.delete(endpoint, { data })
        return response
    }
}

export default ApiClient