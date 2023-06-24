import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Navbar from './components/Navbar';
import Download from './pages/Download';
import Upload from './pages/Upload';
import { DownloadStatus } from './constants/DownloadStatus';
import Footer from './components/Footer';

import 'bulma/css/bulma.min.css';

const App = () => {
  const [downloadStatus, setDownloadStatus] = useState(DownloadStatus.FILENOTFOUND);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [fileDetails, setFileDetails] = useState();

  function getFileDetails(fileId) {
    axios.get('/api/details', 
    { params: { id: fileId } })
    .then(res => {
      if (res.data.message === 'File found') {
        setFileDetails(res.data.fileDetails);
        setDownloadStatus(DownloadStatus.FILEFOUND);
      } else {
        setDownloadStatus(DownloadStatus.FILENOTFOUND);
      }
    });
  }

  function onDownloadProgress(e) {
    const percent = Math.floor((e.loaded * 100) / e.total);
    setDownloadProgress(percent);
  }

  function downloadFile() {
    setDownloadStatus(DownloadStatus.DOWNLOADING);

    axios.get(fileDetails.location, {
      onDownloadProgress
    }).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileDetails.originalname);
      document.body.appendChild(link);
      link.click();
    }).finally(() => {
      axios.get('/api/delete', {
        params: { id: fileDetails.key }
      });
      setDownloadStatus(DownloadStatus.DOWNLOADSUCCESS);
    });
  }

  return (
    <div>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/download" element={
            <Download 
              fileDetails={fileDetails}
              downloadStatus={downloadStatus}
              getFileDetails={getFileDetails}
              downloadFile={downloadFile}
              downloadProgress={downloadProgress}/>
          }/>
          <Route path="/" element={<Upload />}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  )
}
  
export default App;