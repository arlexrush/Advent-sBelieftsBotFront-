import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertPdf } from "../../Actions/pdfAction";


const UploadPdf = () => {

  const dispatch = useDispatch();
  const [pdfFile, setPdfFile] = useState(null);

  const { pdfs, loading, error } = useSelector((state) => state.pdfs);

  /* useEffect(() => {
    if (pdfs) {
      setPdfFile(null); // Limpiar el objeto pdfFile después de la conversión
    }
  }, [pdfs, loading, error]); */
  
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
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button onClick={handleConvertPdf}>Convertir PDF</button>
      </div>
    </Fragment>
  );
};

export default UploadPdf;
