import axios from 'axios';
import { BACKEND_URL } from '../constants';

const axiosInstance = axios.create({
	baseURL: BACKEND_URL
});


axiosInstance.interceptors.response.use(
	async (res: any) => res?.data,
);

export default axiosInstance;
