import React, { Fragment, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertPdf } from "../../Actions/pdfAction";
import Loading from "../Layout/Loading";
import LinearProgress from '@material-ui/core/LinearProgress';


const UploadPdf = () => {
  const dispatch = useDispatch();
  const [pdfFile, setPdfFile] = useState(null);
  //const [progressValue, setProgressValue] = useState(0); // Initialize progress state
  

  const { loading, progress } = useSelector((state) => state.pdfs);
  
 

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };
  
  const handleConvertPdf = () => {
    if (pdfFile) {
      dispatch(convertPdf(pdfFile)); // No es necesario pasar handleUploadProgress           
      setPdfFile('');
    }
  };
  
  return (
    <Fragment>
      <div>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}          
        />
        <button onClick={handleConvertPdf}>Convertir PDF</button>
      </div>
      <LinearProgress
        color="secondary" // Personalice el color como desee
        variant="determinate" // Para una barra de progreso determinista        
        value={progress} // Establezca el valor de progreso desde el estado
      />
      {loading ? <Loading /> : <div></div>}
    </Fragment>
  );
};

export default UploadPdf;
