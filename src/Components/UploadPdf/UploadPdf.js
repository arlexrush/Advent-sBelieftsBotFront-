import React, { Fragment, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertPdf } from "../../Actions/pdfAction";
import Loading from "../Layout/Loading";



const UploadPdf = () => {

  const dispatch = useDispatch();
  const [pdfFile, setPdfFile] = useState(null);

  const { pdfs, loading, error } = useSelector((state) => state.pdfs);

  const fileInputRef = useRef(null);

  useEffect(() => {    
    
    if(pdfs || error || loading){
        setPdfFile(null);
    }

    if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

  }, [dispatch, pdfs, error, loading]);

    
  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };
  const handleConvertPdf = () => {
    if (pdfFile) {
      dispatch(convertPdf(pdfFile));           
    }
  };

  return (
    <Fragment>
      <div>
        <input type="file" accept=".pdf" onChange={handleFileChange} ref={fileInputRef} />
        <button onClick={handleConvertPdf}>Convertir PDF</button>
      </div>
      {loading? (<Loading/>):(<div></div>)}
        
        
    </Fragment>
  );
};

export default UploadPdf;
