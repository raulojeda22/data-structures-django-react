import { algorithmConstants } from '../constants';
import { algorithmService } from '../services';
import { alertActions } from './';

export const algorithmActions = {
    list,
    get,
    listAuthor,
    create,
};

function list() {
    return dispatch => {
        dispatch(request());

        algorithmService.list()
            .then(
                value => {
                    dispatch(success(value));
                    dispatch(alertActions.success("Algorithm list received"))
                },
                error => {
                    console.log(error);
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(value) { return { type: algorithmConstants.LIST_ALGORITHM_REQUEST, value } }
    function success(value) { return { type: algorithmConstants.LIST_ALGORITHM_SUCCESS, value } }
    function failure(error) { return { type: algorithmConstants.LIST_ALGORITHM_FAILURE, error } }
}

function listAuthor(author) {
    return dispatch => {
        dispatch(request(author));

        algorithmService.listAuthor(author)
            .then(
                value => {
                    dispatch(success(value));
                    dispatch(alertActions.success("Algorithm list received"))
                },
                error => {
                    console.log(error);
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(value) { return { type: algorithmConstants.LIST_ALGORITHM_REQUEST, value } }
    function success(value) { return { type: algorithmConstants.LIST_ALGORITHM_SUCCESS, value } }
    function failure(error) { return { type: algorithmConstants.LIST_ALGORITHM_FAILURE, error } }
}

function get(name) {
    return dispatch => {
        dispatch(request({ name }));

        algorithmService.get(name)
            .then(
                value => {
                    console.log(value);
                    dispatch(success(value));
                    dispatch(alertActions.success("Algorithm received"))
                },
                error => {
                    console.log(error);
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(value) { return { type: algorithmConstants.GET_ALGORITHM_REQUEST, value } }
    function success(value) { return { type: algorithmConstants.GET_ALGORITHM_SUCCESS, value } }
    function failure(error) { return { type: algorithmConstants.GET_ALGORITHM_FAILURE, error } }
}

function create(algorithm) {
    return dispatch => {
        dispatch(request({ algorithm }));

        algorithmService.create(algorithm)
            .then(
                value => {
                    dispatch(success());
                    dispatch(alertActions.success("Algorithm created"))
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(value) { return { type: algorithmConstants.CREATE_ALGORITHM_REQUEST, value } }
    function success(value) { return { type: algorithmConstants.CREATE_ALGORITHM_SUCCESS, value } }
    function failure(error) { return { type: algorithmConstants.CREATE_ALGORITHM_FAILURE, error } }
}