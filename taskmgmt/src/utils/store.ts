import { configureStore } from '@reduxjs/toolkit';

import storeReducer from './storeReducer';

export default configureStore({
  reducer: {
    stateStore: storeReducer
  },
});