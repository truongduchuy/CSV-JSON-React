import React from "react";
import Files from "react-files";
import * as XLSX from "xlsx";
import * as CSV from "../utils/csv";

function Upload(props) {
  const { fileName, onFilesError, onSuccess, type, text } = props;

  const handleUpload = (files) => {
    const file = files[0];

    if (type === "csv") {
      const reader = new FileReader();
      reader.onload = (evt) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        onSuccess({ data: CSV.parse(data), fileName: file.name });
      };
      reader.readAsBinaryString(file);
    } else {
      const fileReader = new FileReader();
      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = (e) => {
        console.log(e.target.result)
        onSuccess({ data: JSON.parse(e.target.result), fileName: file.name });
      };
    }
  };

  const isDisabled = fileName && !fileName.endsWith(type);

  return (
    <Files
      className={`side-box ${isDisabled && "disabled"}`}
      onChange={handleUpload}
      onError={onFilesError}
      accepts={[`.${type}`]}
      multiple
      maxFileSize={10000000}
      minFileSize={0}
      clickable={!isDisabled}
      maxFiles={1}
    >
      {fileName.endsWith(type) ? fileName : text}
    </Files>
  );
}

export default Upload;
