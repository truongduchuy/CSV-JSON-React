import React from "react";
import Files from "react-files";

function UploadJson(props) {
  const { fileName, onFilesError, onSuccess } = props;

  const handleUpload = (files) => {
    const file = files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = (e) => {
      onSuccess({ data: JSON.parse(e.target.result), fileName: file.name });
    };
  };

  return (
    <Files
      className={`json-box ${fileName.endsWith(".csv") && "disabled"}`}
      onChange={handleUpload}
      onError={onFilesError}
      accepts={[".json"]}
      multiple
      maxFileSize={10000000}
      minFileSize={0}
      clickable={!fileName.endsWith(".csv")}
      maxFiles={1}
    >
      {fileName.endsWith(".json")
        ? fileName
        : "Drop JSON file here or click to upload"}
    </Files>
  );
}

export default UploadJson;
