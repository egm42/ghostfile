import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Navbar from './components/Navbar';
import Download from './pages/Download';
import Upload from './components/Upload';
import { DownloadStatus } from './constants/DownloadStatus';

import 'bulma/css/bulma.min.css';

const App = () => {
  const [s3downloadUrl, setS3DownloadUrl] = useState(null)
  const [downloadId, setDownloadId] = useState();
  const [downloadFileName, setDownloadFileName] = useState();
  const [downloadStatus, setDownloadStatus] = useState(DownloadStatus.FILENOTFOUND);
  const [downloadFileTtl, setDownloadFileTtl] = useState();
  const [downloadProgress, setDownloadProgress] = useState(0);

  function getFileDetails(fileId) {
    axios.get('/api/details', 
    { params: { id: fileId } })
    .then(res => {
      if (res.data.message === 'File found') {
        setDownloadId(res.data.fileDetails.key);
        setDownloadFileName(res.data.fileDetails.originalname);
        setDownloadStatus(DownloadStatus.FILEFOUND);
        setS3DownloadUrl(res.data.fileDetails.location);
        setDownloadFileTtl(res.data.fileDetails.ttl)
      } else {
        setDownloadStatus(DownloadStatus.FILENOTFOUND);
      }
    });
  }

  function onDownloadProgress(e) {
    const percent = Math.floor((e.loaded * 100) / e.total);
    console.log(percent)
    setDownloadProgress(percent);
  }

  function downloadFile() {
    setDownloadStatus(DownloadStatus.DOWNLOADING);

    axios.get(s3downloadUrl, {
      onDownloadProgress
    }).then((res) => {
      console.log(res)
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', downloadFileName);
      document.body.appendChild(link);
      link.click();
    }).finally(() => {
      axios.get('/api/delete', {
        params: { id: downloadId }
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
              downloadStatus={downloadStatus}
              setDownloadStatus={setDownloadStatus}
              getFileDetails={getFileDetails}
              downloadId={downloadId}
              downloadFileName={downloadFileName}
              downloadFile={downloadFile}
              ttl={downloadFileTtl}
              s3downloadUrl={s3downloadUrl}
              downloadProgress={downloadProgress}/>
          }/>
          <Route path="/" element={<Upload />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
  
export default App;