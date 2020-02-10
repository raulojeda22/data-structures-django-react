import config from '../config/config.json';
import { authHeader } from '../helpers';

export const algorithmService = {
    list,
    get
};

function list() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/algorithms`, requestOptions).then(handleList);
}

function get(name) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/algorithms/${name}`, requestOptions).then(handleGet);
}

function handleList(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data.algorithms;
    });
}

function handleGet(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data.algorithm;
    });
}