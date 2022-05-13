import React, { Fragment, useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose file");

  const fileChange = (e) => {
      e.preventDefault(); 
      setFile(e.tagret.files[0])
      setFilename(e.target.files[0].name);
  }


  return (
    <Fragment>
      <form action="">
        <div className="custom-file">
          <input type="file" className="custom-file-input" id="customFile" onChange={(e) => fileChange(e)}/>
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>
        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
    </Fragment>
  );
};

export default FileUpload;
