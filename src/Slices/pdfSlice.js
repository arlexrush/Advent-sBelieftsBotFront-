import { createSlice } from "@reduxjs/toolkit";
import { convertPdf } from "../Actions/pdfAction";



export const initialState = {
    pdfs:null,
    loading: false,
    error: null,
  };

  export const pdfSlice = createSlice({
    name: "pdfs",
    initialState,
    reducers: {
            
    },
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
          console.log("Mensaje recibido del Backend:", payload.data);          
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
  
  export const pdfsReducer = pdfSlice.reducer;