import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertPdf } from "../../Actions/pdfAction";
import Loading from "../Layout/Loading";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";


const UploadPdf = () => {
  const dispatch = useDispatch();
  const [pdfFile, setPdfFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  
  //const [progressValue, setProgressValue] = useState(0); // Initialize progress state

  const { loading, progress, error, success } = useSelector((state) => state.pdfs);

  useEffect(() => {
    // Este efecto se ejecutará cada vez que 'progress' cambie
    console.log("Progreso actualizado:", progress);
    console.log("Success actualizado:", success);
  

    if (success) {
      setShowAlert(true);
      setAlertMessage(`The File: ${pdfFile.name} upload successfull`);
    }
   

  }, [progress, success, error, pdfFile]);

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleConvertPdf = () => {
    if (pdfFile) {
      setShowAlert(false);
      dispatch(convertPdf(pdfFile)); // No es necesario pasar handleUploadProgress
      setPdfFile(pdfFile);
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
            {progress>0?              
              <LinearProgress
                className="mb-3"
                color="secondary" // Personalice el color como desee
                variant="determinate" // Para una barra de progreso determinista
                value={progress} // Establezca el valor de progreso desde el estado
              />:null
            }
            {loading && progress <= 0 ? <Loading /> : <div></div>}
            {showAlert?? (
              <Alert severity="success" onClose={() => setShowAlert(false)}>
                {alertMessage}
              </Alert>
            )}
          </div>
        </div>
      </div>
      }
      </div>
      
    </Fragment>
  );
};

export default UploadPdf;
