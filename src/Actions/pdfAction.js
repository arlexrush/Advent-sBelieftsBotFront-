import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../Utilities/axios";
import delayedTimeOut from "../Utilities/delayedTimeOut";
import {setUploadProgress } from "../Slices/pdfSlice";


export const convertPdf = createAsyncThunk(
  "convert/converPdf",
  async (pdf_file, { rejectWithValue, dispatch }) => {
    
    try {
      await delayedTimeOut(1000);            

      let responseAxios=null;
      let streamData=null;
      let response=null;
      console.log(`pdf_file: ${pdf_file}`)
      console.log(`pdf_file_Value: ${pdf_file.size ===0}`)      
      console.log(`pdf: ${typeof pdf_file.name === 'string'}`);
      

      if(typeof pdf_file.name === 'string'&&pdf_file){

        // Creando un objeto FormData para enviar el archivo PDF
        const formData = new FormData();
        formData.append("pdf_file", pdf_file);

        // Realizando la solicitud POST a /convert con el archivo PDF
          responseAxios = await axios.post('/convert', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob', // Establecer el tipo de respuesta como 'blob'
        });

        // Obtener la URL del stream de eventos a partir de la respuesta
        const streamUrl = URL.createObjectURL(responseAxios.data);

        // Utilizando EventSource para recibir los eventos del servidor
        const eventSource = new EventSource(streamUrl);

        // Crear una promesa para manejar los eventos
        streamData = new Promise((resolve, reject) => {
          let data = 0;
          
          const handleMessage = (event) => {
            
            const progressDataString = event.data;
            const progress = ((progressDataString/100))*100; 
            console.log('progressValue:', progress);
            
            if (progress>0){              
              setTimeout(() => {
                dispatch(setUploadProgress(progress)); // Despachar acción aquí;
              }, 1000); // Retardo de 3 segundos (3000 milisegundos)
              clearTimeout();
            }      

            console.log('Mensaje recibido del Backend:', event.data);
            
            data += event.data;
          };

          eventSource.addEventListener('message', handleMessage);

          
          eventSource.addEventListener('open', () => {
            console.log('Conexión establecida con el servidor');
          });

          eventSource.addEventListener('close', () => {
            console.log('Conexión EventSource cerrada');
            // Manejar el cierre de la conexión si es necesario
            eventSource.close(); // Cerrar la conexión EventSource
          });

          eventSource.addEventListener('end', () => {
            console.log('Flujo de datos finalizado');
            resolve(data);
            eventSource.removeEventListener('message', handleMessage); // Remover el event listener de 'message'
            eventSource.close(); // Cerrar la conexión EventSource
          });

          eventSource.addEventListener('error', (event) => {            
            //reject(event);
            eventSource.removeEventListener('message', handleMessage); // Remover el event listener de 'message'
            //reject(event);
            eventSource.close();
          });

        });

      };
      
      response = await streamData;
      console.log("Data from API:", response);
      return response;
      //return response.data;

    } catch (err) {
      console.error('Error al convertir PDF:', err);
        // Manejar errores de manera más robusta
      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const downloadPdf=createAsyncThunk(
  "convert/download",
  async(filename, {rejectWithValue}) => {
      
    if(typeof filename === 'string'){

      try{
        
        await delayedTimeOut(1000);
        
        const response = await axios.get(`/download?filename=${filename}`,
          {responseType: 'blob'}, // Establecer el tipo de respuesta como 'blob'
        );
        //const url = window.URL.createObjectURL(new Blob([response.data]));
        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        
        // Utilizar la API download
        if (window.navigator.msSaveBlob) {
          // Internet Explorer
          window.navigator.msSaveBlob(response.data, filename);
        } else {
          // Otros navegadores
          const downloadLink = document.createElement('a');
          downloadLink.href = url;
          downloadLink.download = filename;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        }
        window.URL.revokeObjectURL(url);
        
        console.log("url", url);

        console.log("Data from API_download:", response.data);
        //return response;
        //return response.data;
      }catch(err){
        return rejectWithValue(`Errors:${err.message}`);
      }
    }
      
  }
);
