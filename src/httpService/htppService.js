import axios from "axios";
import { notification } from 'antd';
import history from '../history';

const http = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 60000
});

http.interceptors.request.use((config) => {
  return config;
  }, (error) => {
    	// Do something with request error here
    notification.error({
      message: 'Error'
    })
    Promise.reject(error)
});

http.interceptors.response.use((response) => {
	return response.data
}, (error) => {
  let notificationParam = {
		message: ''
	}

	if (error.response.status === 400 || error.response.status === 403) {
		notificationParam.message = 'Authentication Fail'
		history.push('/');
		window.location.reload();
	}

	if (error.response.status === 404) {
		notificationParam.message = 'Not Found'
	}

	if (error.response.status === 500) {
		notificationParam.message = 'Internal Server Error'
	}
	
	if (error.response.status === 508) {
		notificationParam.message = 'Time Out'
	}

	notification.error(notificationParam)

	return Promise.reject(error);
});

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};

export default httpService;
