import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertPdf, downloadPdf } from "../../Actions/pdfAction";
import Loading from "../Layout/Loading";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";
import { setUploadProgress } from "../../Slices/pdfSlice";


const UploadPdf = () => {
  const dispatch = useDispatch();
  const [pdfFile, setPdfFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [afterLoadingUpload, setafterLoadingUpload]=useState(false);
  const [internalProgress, setInternalPregress]=useState(false);
  const [reloadFile, setReloadFile]=useState(false);
  
  //const [progressValue, setProgressValue] = useState(0); // Initialize progress state

  const { loading, progress, error, success } = useSelector((state) => state.pdfs);
  
  
  useEffect(() => {
    // Este efecto se ejecutará cada vez que 'progress' cambie
    console.log("Progreso actualizado:", progress);
    console.log("Success actualizado:", success);
  
   

    if (progress===100) {
      setShowAlert(true);
      setAlertMessage(`The File: ${pdfFile.name} has been successfulled Upload`);
      setReloadFile(true);
      
    }
    

    if(loading){
      if(progress<100&&progress>0){
        setafterLoadingUpload(true);
      }else{
        setafterLoadingUpload(false);
      }      
    }   


    if(progress>0&&progress<100){
      setInternalPregress(true);
    }else{
      setInternalPregress(false);
    }


    if(reloadFile){
      setafterLoadingUpload(true);
      setShowAlert(false);
      dispatch(convertPdf(pdfFile));      
      const txtFilename = pdfFile.name.replace('.pdf', '.txt');
      if(progress>=100){
        dispatch(downloadPdf(txtFilename));
      /* dispatch(convertPdf(pdfFile)).then((result) => {
        if (result.payload) {
          const txtFilename = pdfFile.name.replace('.pdf', '.txt');
          dispatch(downloadPdf(txtFilename));
        }
      }); */ // No es necesario pasar handleUploadProgress    
        setPdfFile(pdfFile); 
      }
    }
  }, [dispatch, progress, success, error, pdfFile, loading, reloadFile]);

  const handleFileChange = (event) => {
    setPdfFile(null);    
    dispatch(setUploadProgress(0));
    setPdfFile(event.target.files[0]);
    setShowAlert(false);
  };

  const handleConvertPdf = () => {
    if (pdfFile) {
      setafterLoadingUpload(true);
      setShowAlert(false);
      dispatch(convertPdf(pdfFile));      
      const txtFilename = pdfFile.name.replace('.pdf', '.txt');
      if(progress>=100){
        dispatch(downloadPdf(txtFilename));
      /* dispatch(convertPdf(pdfFile)).then((result) => {
        if (result.payload) {
          const txtFilename = pdfFile.name.replace('.pdf', '.txt');
          dispatch(downloadPdf(txtFilename));
        }
      }); */ // No es necesario pasar handleUploadProgress    
        setPdfFile(pdfFile); 
      }else{
        setReloadFile(true);
      }      
      
    }
  };

   
  return (
    <Fragment>
      <div>
      {error?<div>Error: {error}</div>:
        <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <div className="custom-file">
                <input 
                  type="file" 
                  className="custom-file-input"
                  id="inputPdf" 
                  accept=".pdf" 
                  onChange={handleFileChange} />
                {pdfFile?<label className="custom-file-label" htmlFor="inputPdf">{pdfFile.name}</label>:
                <label className="custom-file-label" htmlFor="inputPdf">
                  Select PDF file
                </label>}
              </div>
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleConvertPdf}
                >
                  Convert to TXT
                </button>
              </div>
            </div>
            {internalProgress?              
              <LinearProgress
                className="mb-3"
                color="secondary" // Personalice el color como desee
                variant="determinate" // Para una barra de progreso determinista
                value={progress} // Establezca el valor de progreso desde el estado
              />:null
            }
            {afterLoadingUpload? <Loading />:<div></div>
            }     
            {showAlert?
              (
                <Alert severity="success" onClose={() => setShowAlert(false)}>
                  {alertMessage}
                </Alert>
              ):<div></div>
            }       
          </div>
        </div>
      </div>
      }
      </div>
      
    </Fragment>
  );
};

export default UploadPdf;
