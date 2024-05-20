import { createSlice } from "@reduxjs/toolkit";
import { downloadPdf } from "../Actions/pdfAction";



export const initialState = {
    downloadPdf:"",
    loading: false,
    error: null,    
  };


  export const downloadSlice = createSlice({
    name: "dowloadPdfs",
    initialState,
    reducers: {}
    ,
    extraReducers: (builder) => {
      builder
        .addCase(downloadPdf.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(downloadPdf.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.downloadPdfS = payload;
          state.error = null;
          console.log("Mensaje recibido del Backend:", payload);          
        })
        .addCase(downloadPdf.rejected, (state, action) => {
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
    
  export const downloadReducer = downloadSlice.reducer;