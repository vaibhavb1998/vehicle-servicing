import { configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger';

import reducer from './reducer';
import api from './middleware/api';

// ==============================|| STORE ||============================== //

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), api]
});

export default store;
