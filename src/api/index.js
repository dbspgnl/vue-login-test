import axios from 'axios';
import { setInterceptors } from './interceptors';

function createInstance() {
	return axios.create({
		baseURL: 'http://localhost:3000/',
	});
}
const instance = setInterceptors(createInstance());

function loginUser(userData) {
	const requestUrl = 'login';
	return instance.post(requestUrl, userData);
}

export { loginUser };
