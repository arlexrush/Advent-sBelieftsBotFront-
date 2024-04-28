import React from "react";

const Loading = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center containerLoading" style={{height: '100vh'}}>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "0.1vh" }}
      >
        <div
          className="spinner-grow m-2 delay-3"
          role="status"
          style={{ color: "ff6462" }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>

      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "0.1vh" }}
      >
        <div
          className="spinner-grow m-2 delay-3"
          role="status"
          style={{ color: "ff6462" }}
        >
          <span className="sr-only">Loading...</span>
        </div>
        <div
          className="spinner-border spinner-border-lg m-2"
          role="status"
          style={{ color: "#febd69" }}
        >
          <span className="sr-only">Loading...</span>
        </div>
        <div
          className="spinner-grow m-2 delay-3"
          role="status"
          style={{ color: "ff6462" }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>

      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "0.1vh" }}
      >
        <div
          className="spinner-grow m-2 delay-3"
          role="status"
          style={{ color: "ff6462" }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
