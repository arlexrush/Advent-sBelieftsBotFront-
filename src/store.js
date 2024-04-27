import { configureStore } from '@reduxjs/toolkit';
import { pdfsReducer } from './Slices/pdfSlice';

const store = configureStore({
    reducer:{
        pdfs:pdfsReducer,
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false
    }),
});

export default store;