import { editorConstants } from '../constants';

export function editation(state = {}, action) {
    switch (action.type) {
      case editorConstants.EDITOR_REQUEST:
        return { editating: true };
      case editorConstants.EDITOR_SUCCESS:
        return { output: action.value };
      case editorConstants.EDITOR_FAILURE:
        return { output: action.value };
      default:
        return state
    }
  }