import { createSlice } from "@reduxjs/toolkit";
import { convertPdf } from "../Actions/pdfAction";



export const initialState = {
    pdfs: [],
    loading: false,
    error: null,
  };

  export const pdfSlice = createSlice({
    name: "pdfs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(convertPdf.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(convertPdf.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.products = payload.data;
          state.error = null;
          console.log("Datos de productos recibidos:", payload.data);
          console.log("Estado de Redux actualizado:", state.products);
        })
        .addCase(convertPdf.rejected, (state, action) => {
          state.loading = false;
          //state.error = action.error;
          state.error=action.payload;
          console.log("error:", state.error);
          console.log("error Server:", action.error);
          console.log("Error Message:", action.error.message);
          console.log("Error en Payload:", action.payload);
        });
    },
  });
  
  export const pdfReducer = pdfSlice.reducer;