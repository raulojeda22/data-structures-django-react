import { editorConstants } from '../constants';

export function editation(state = {}, action) {
    switch (action.type) {
      case editorConstants.EDITOR_REQUEST:
        return { ...state, editating: true };
      case editorConstants.EDITOR_SUCCESS:
        return { ...state, output: action.value, editating: false };
      case editorConstants.EDITOR_FAILURE:
        return { ...state, output: action.value, editating: false };
      default:
        return state
    }
  }