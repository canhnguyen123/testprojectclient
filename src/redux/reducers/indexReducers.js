import { combineReducers } from 'redux';
import reducers from './reducers';
const rootReducer = combineReducers({
  reducers: reducers, 
});

export default rootReducer;
