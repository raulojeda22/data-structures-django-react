import { alertConstants } from '../constants';
import { toast } from 'react-toastify';

toast.configure({
    position: toast.POSITION.BOTTOM_RIGHT,
});

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    toast.success(message);
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    toast.error(message);
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}