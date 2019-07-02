import { combineReducers } from 'redux';

import { default as data } from './field';
import { default as rules } from './rules';

const reducer = combineReducers({
  data,
  rules
});

export default reducer;