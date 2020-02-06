import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { editation } from './editation.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  editation,
  users,
  alert
});

export default rootReducer;