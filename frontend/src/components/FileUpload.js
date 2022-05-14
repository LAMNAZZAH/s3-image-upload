import React, { Fragment, useState } from "react";
import Message from "./Message";
import axios from "axios";
import Progress from './Progress'

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose file");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState();
  const [uplaodPercentage, setuploadPercentage] = useState(0);

  const fileChange = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    console.log(`file: ${filename}`);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (ProgressEvent) => {
          setuploadPercentage(
            parseInt(
              Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
            )
          );
          setTimeout(() => setuploadPercentage(0), 10000)
        },
      });

      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      setMessage(`Uploaded file: fileName: ${fileName}, filePath: ${filePath}`);
    } catch (err) {
      if (err.response.status === 500) setMessage("Internal error");
      else setMessage(`${err.response.data.msg}`);
    }
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={(e) => fileChange(e)}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>
        <Progress percentage={uplaodPercentage} />
        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000${uploadedFile.filePath}`}
              alt=""
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </Fragment>
  );
};

export default FileUpload;
