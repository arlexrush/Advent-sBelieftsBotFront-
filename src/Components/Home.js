import React, { Fragment } from 'react'
import MetaData from '../Components/Layout/MetaData'
import { useSelector } from 'react-redux';
import UploadPdf from './UploadPdf/UploadPdf';


const Home = () => {
    
  //Estado General
  const {    
    error
  }=useSelector((state)=>state.pdfs);

  
  
  return (    
    <Fragment>
      <MetaData titulo={"We are an upload view"}/>
      {error && <div>Error: {error}</div>}
      <UploadPdf/>
    </Fragment>
  );
}

export default Home;