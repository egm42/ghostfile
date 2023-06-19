import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
// import UploadForm from './components/UploadForm';
// import Uploading from './components/Uploading';
// import UploadSuccess from './components/UploadSuccess';
import Navbar from './components/Navbar';
import Download from './pages/Download';
import Upload from './components/Upload';
import { UploadStatus } from './constants/UploadStatus';
import { DownloadStatus } from './constants/DownloadStatus';

import 'bulma/css/bulma.min.css';

const App = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [uploadStatus, setUploadStatus] = useState(UploadStatus.FILEUNSELECTED);
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadId, setDownloadId] = useState();
  const [downloadFileName, setDownloadFileName] = useState();
  const [downloadStatus, setDownloadStatus] = useState(DownloadStatus.FILENOTFOUND);

  function changeHandler(event) {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setUploadStatus(UploadStatus.FILESELECTED)
    }
  }

  function onUploadProgress(e) {
    const percent = Math.floor((e.loaded * 100) / e.total);
    setUploadProgress(percent);
  }

  function uploadFile(e) {
    if (uploadStatus === UploadStatus.FILESELECTED) {
      setUploadStatus(UploadStatus.UPLOADING);
      axios.post('/upload', {
        file: selectedFile
      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress
      }).then(res => {
        switch(res.status) {
          case 200:
            // setDownloadUrl(res.data.testUrl);
            setUploadStatus(UploadStatus.UPLOADSUCCESS);
            console.Console('upload success')
            return;
          default:
            setUploadStatus(UploadStatus.UPLOADFAILED);
            return;
        }
      });
    }
  }

  function getFileDetails(fileId) {
    console.log('file details: ',fileId);
    axios.get('/details', 
    { params: { id: fileId } })
    .then(res => {
      console.log('message: ',res.data.message);
      if (res.data.message === 'File found') {
        console.log(res.data.fileDetails);
        setDownloadId(fileId);
        setDownloadFileName(res.data.fileDetails.originalname);
        setDownloadStatus(DownloadStatus.FILEFOUND);
        setDownloadUrl(res.data.testUrl);
      } else {
        setDownloadStatus(DownloadStatus.FILENOTFOUND);
      }
    });
  }

  // function copyUrl() {
  //   try {
  //     navigator.clipboard.writeText(downloadUrl);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  function downloadFile() {
    console.log('downloading file: ', downloadId);
    console.log('test');
    // window.open(downloadUrl);
    // axios.get('/download',
    // { 
    //   params: { id: downloadId },
    //   responseType: 'blob'
    // }).then((res) => {
    //   console.log(res)
    //   const url = window.URL.createObjectURL(new Blob([res.data]));
    //   const link = document.createElement('a');
    //   link.href = url;
    //   link.setAttribute('download', filename);
    //   document.body.appendChild(link);
    //   link.click();
    // });
    // .then(res => {
    //   console.log(res);
    //   setDownloadStatus(DownloadStatus.DOWNLOADING);
    // });
  }

  // function renderForm() {
  //   switch(uploadStatus) {
  //     case UploadStatus.UPLOADFAILED:
  //       return <UploadForm changeHandler={changeHandler} uploadFile={uploadFile} uploadStatus={uploadStatus} selectedFile={selectedFile}/>
  //     case UploadStatus.UPLOADSUCCESS:
  //       return <UploadSuccess downloadUrl={downloadUrl} copyUrl={copyUrl}/>
  //     case UploadStatus.UPLOADING:
  //       return <Uploading uploadProgress={uploadProgress} selectedFile={selectedFile}/>
  //     case UploadStatus.FILESELECTED:
  //     case UploadStatus.FILEUNSELECTED:
  //       return <UploadForm changeHandler={changeHandler} uploadFile={uploadFile} uploadStatus={uploadStatus} selectedFile={selectedFile}/>
  //   }
  // } 

  return (
    <div>
      <Navbar/>
      <BrowserRouter>
      <Routes>
        <Route path="/download" element={<Download downloadStatus={downloadStatus} setDownloadStatus={setDownloadStatus} getFileDetails={getFileDetails} downloadId={downloadId} downloadFileName={downloadFileName} downloadFile={downloadFile} />}/>
          {/* <Route index element={<Download />} />
          <Route path="download" element={<Download />} /> */}
        {/* </Route> */}
        <Route path="/" element={<Upload />}/>
      </Routes>
    </BrowserRouter>
      {/* <br/>
      
      <div className='columns is-centered is-gapless'>
        <div className='column is-four-fifths'>
          {renderForm()}
        </div>
      </div> */}
    </div>
  )
}
  
export default App;