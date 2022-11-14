import React from "react";

function DownloadJsonButton(props) {
  const { data } = props;

  return (
    <a
      href={`data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(data)
      )}`}
      download="data.json"
      className="json-box"
    >
      Export json
    </a>
  );
}

export default DownloadJsonButton;
