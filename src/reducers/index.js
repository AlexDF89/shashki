import { combineReducers } from 'redux';

import { default as field } from './field';
import {default as checker} from './checker';
import {default as cell} from './cell';

const reducer = combineReducers({
  field,
  checker,
  cell
});

export default reducer;