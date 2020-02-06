import config from '../config/config.json';
import { authHeader } from '../helpers';

export const editorService = {
    execute
};

function execute(value) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ "code": value})
    };
    return fetch(`${config.apiUrl}/docker`, requestOptions)
        .then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data.object.response;
    });
}