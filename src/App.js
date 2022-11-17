import React, { useState, useRef } from "react";
import "./App.css";
import DownloadButton from "./components/DownloadButton";
import * as CSV from "./utils/csv";

function App() {
  const [data, setData] = useState({});

  const handleConvert = (toType) => {
    if (toType === "csv") {
      console.log({ jsonData: data.json });
      setData({ ...data, csv: CSV.stringify(JSON.parse(data.json)) });
    } else {
      setData({ ...data, json: JSON.stringify(CSV.parse(data.csv)) });
    }
  };

  const handleChange = (value, field) => {
    setData({ ...data, [field]: value });
    console.log({ ...data, [field]: value });
  };
  const handleClear = () => {
    setData({ csv: "", json: "" });
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
          <div className="side-box">
            <textarea
              value={data.csv}
              onChange={(event) => handleChange(event.target.value, "csv")}
              rows="4"
              cols="50"
            ></textarea>
            <DownloadButton data={data.csv} type="csv" />
          </div>
          <div className="actions-box">
            <button onClick={() => handleConvert("json")}>
              CSV &rarr; JSON
            </button>
            <button onClick={() => handleConvert("csv")}>
              CSV &larr; JSON
            </button>
          </div>
          <div className="side-box">
            <textarea
              value={data.json}
              onChange={(event) => handleChange(event.target.value, "json")}
              rows="4"
              cols="50"
            ></textarea>
            <DownloadButton data={data.json} type="json" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
