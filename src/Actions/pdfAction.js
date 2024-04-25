import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../Utilities/axios";
import delayedTimeOut from "../Utilities/delayedTimeOut";

export const convertPdf = createAsyncThunk(
  "convert/converPdf",
  async (pdf_file, { rejectWithValue }) => {
    try {
      await delayedTimeOut(1000);

      // Creando un objeto FormData para enviar el archivo PDF
      const formData = new FormData();
      formData.append("pdf_file", pdf_file);

      // Realizando la solicitud POST a /convert con el archivo PDF
      const response = await axios.post('/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Data from API:", response.data);
      return response.data;
      //return response.data;
    } catch (err) {
        console.error('Error al convertir PDF:', err);
        return rejectWithValue(`Errors:${err.message}`);
    }
  }
);
