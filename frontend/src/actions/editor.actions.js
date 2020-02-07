import { editorConstants } from '../constants';
import { editorService } from '../services';
import { alertActions } from './';

export const editorActions = {
    execute
};

function execute(value) {
    return dispatch => {
        dispatch(request({ value }));

        editorService.execute(value)
            .then(
                value => {
                    dispatch(success(value));
                    dispatch(alertActions.success("Executed"))
                },
                error => {
                    console.log(error);
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(value) { return { type: editorConstants.EDITOR_REQUEST, value } }
    function success(value) { return { type: editorConstants.EDITOR_SUCCESS, value } }
    function failure(error) { return { type: editorConstants.EDITOR_FAILURE, error } }
}
