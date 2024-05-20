import { configureStore } from '@reduxjs/toolkit';
import { pdfsReducer } from './Slices/pdfSlice';
import { downloadReducer } from './Slices/downloadSlice';

const store = configureStore({
    reducer:{
        pdfs:pdfsReducer,
        downloadPdfs:downloadReducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false
    }),
});

export default store;