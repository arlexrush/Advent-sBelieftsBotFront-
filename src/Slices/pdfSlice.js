import { createSlice } from "@reduxjs/toolkit";
import { convertPdf } from "../Actions/pdfAction";



export const initialState = {
    pdfs:"",
    loading: false,
    error: null,
    progress: 0.00
  };

  export const pdfSlice = createSlice({
    name: "pdfs",
    initialState,
    reducers: {
      setUploadProgress(state, action) {
        state.progress = action.payload;
        console.log('payload:', action.payload);
        console.log('preogress State:', state.progress);
    }},
    extraReducers: (builder) => {
      builder
        .addCase(convertPdf.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(convertPdf.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.pdfs = payload;
          state.error = null;
          console.log("Mensaje recibido del Backend:", payload);          
        })
        .addCase(convertPdf.rejected, (state, action) => {
          state.loading = false;
          //state.error = action.error;
          state.error=action.payload || "Error desconocido"; // Accede al payload para obtener el mensaje de error;
          console.log("error:", state.error);
          console.log("error Server:", action.error);
          console.log("Error Message:", action.error.message);
          console.log("Error en Payload:", action.payload);
        });
    },
  });
  
  export const { setUploadProgress } = pdfSlice.actions;
  export const pdfsReducer = pdfSlice.reducer;