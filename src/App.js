import React, { useState } from "react";
import "./App.css";
import DownloadButton from "./components/DownloadButton";
import Upload from "./components/Upload";

function App() {
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [isDownloadingCsv, setDownloadingCsv] = useState(false);
  const [isDownloadingJson, setDownloadingJson] = useState(false);

  const onFilesError = (error, file) => {
    console.log("error code " + error.code + ": " + error.message);
    console.log("file " + file);
  };

  const handleConvert = (toType) => {
    if (toType === "csv") {
      if (fileName.endsWith(".json")) {
        setDownloadingCsv(true);
      }
    } else {
      if (fileName.endsWith(".csv")) {
        setDownloadingJson(true);
      }
    }
  };

  const handleUploadSuccess = ({ data, fileName }) => {
    setData(data);
    setFileName(fileName);
    setDownloadingCsv(false);
    setDownloadingJson(false);
  };

  const handleClear = () => {
    setFileName("");
    setDownloadingCsv(false);
    setDownloadingJson(false);
    setData([]);
  };

  return (
    <div className="App">
      <div className="container">
        <h2 className="heading">Converter</h2>
        <div>
          <button onClick={handleClear} className="btn-clear">
            Clear All
          </button>
        </div>
        <div className="convert-box">
          {isDownloadingCsv ? (
            <DownloadButton data={data} type="csv" />
          ) : (
            <Upload
              fileName={fileName}
              onFilesError={onFilesError}
              onSuccess={handleUploadSuccess}
              type="csv"
              text="Drop CSV file here or click to upload"
            />
          )}

          <div className="actions-box">
            <button
              className={`${fileName.endsWith(".json") && "disabled"}`}
              onClick={() => handleConvert("json")}
            >
              CSV &rarr; JSON
            </button>
            <button
              className={`${fileName.endsWith(".csv") && "disabled"}`}
              onClick={() => handleConvert("csv")}
            >
              CSV &larr; JSON
            </button>
          </div>
          {isDownloadingJson ? (
            <DownloadButton data={data} type="json" />
          ) : (
            <Upload
              fileName={fileName}
              onFilesError={onFilesError}
              onSuccess={handleUploadSuccess}
              type="json"
              text="Drop JSON file here or click to upload"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
