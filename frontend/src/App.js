//import logo from './logo.svg';
import React from 'react';
import FileUpload  from './components/FileUpload'
import "./App.css";

const App = () => (
  <div className="container mt-4">
    <h3 className="display-4 text-center mb-4">
      <i className="fab fa-react"></i> React File Upload
    </h3>
    <FileUpload />
  </div>
);

export default App;
