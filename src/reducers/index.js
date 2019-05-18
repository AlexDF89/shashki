import { combineReducers } from 'redux';

import { default as data } from './field';
import {default as checker} from './checker';
import {default as cell} from './cell';

const reducer = combineReducers({
  data,
  checker,
  cell
});

export default reducer;