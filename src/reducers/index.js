import { combineReducers } from 'redux';

import posts from './posts';
import producer from './producer';

const rootReducers = combineReducers({
  posts,
  producer
});

export default rootReducers;
