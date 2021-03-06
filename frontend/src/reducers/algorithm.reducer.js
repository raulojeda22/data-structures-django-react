import { algorithmConstants } from '../constants';

export function algorithm(state = {}, action) {
    switch (action.type) {
        case algorithmConstants.GET_ALGORITHM_REQUEST:
            return { ...state, getting: true};
        case algorithmConstants.GET_ALGORITHM_SUCCESS:
            return {
                ...state,
                getting: false,
                code: action.value
            };
        case algorithmConstants.GET_ALGORITHM_FAILURE:
            return state;
        case algorithmConstants.LIST_ALGORITHM_REQUEST:
            return { ...state, getting: true};
        case algorithmConstants.LIST_ALGORITHM_SUCCESS:
            console.log(action.value);
            return {
                getting: false,
                codeList: action.value
            };
        case algorithmConstants.LIST_ALGORITHM_FAILURE:
            return state;
        case algorithmConstants.CREATE_ALGORITHM_REQUEST:
            return {...state, creating: true};
        case algorithmConstants.CREATE_ALGORITHM_SUCCESS:
            return {...state, creating: false};
        case algorithmConstants.CREATE_ALGORITHM_FAILURE:
            return {...state, creating: false};
      default:
        return state
    }
  }