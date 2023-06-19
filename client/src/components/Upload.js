import { useState } from 'react';
import axios from 'axios';

import { UploadStatus } from '../constants/UploadStatus';
import UploadForm from './UploadForm';
import Uploading from './Uploading';
import UploadSuccess from './UploadSuccess';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [uploadStatus, setUploadStatus] = useState(UploadStatus.FILEUNSELECTED);
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0);

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
            setDownloadUrl(res.data.testUrl);
            setUploadStatus(UploadStatus.UPLOADSUCCESS);
            return;
          default:
            setUploadStatus(UploadStatus.UPLOADFAILED);
            return;
        }
      });
    }
  }

  function copyUrl() {
    try {
      console.log("testtest")
      navigator.clipboard.writeText(downloadUrl);
    } catch (e) {
      console.log(e);
    }
  }

  function renderForm() {
    switch(uploadStatus) {
      case UploadStatus.UPLOADFAILED:
        return <UploadForm changeHandler={changeHandler} uploadFile={uploadFile} uploadStatus={uploadStatus} selectedFile={selectedFile}/>
      case UploadStatus.UPLOADSUCCESS:
        return <UploadSuccess downloadUrl={downloadUrl} copyUrl={copyUrl}/>
      case UploadStatus.UPLOADING:
        return <Uploading uploadProgress={uploadProgress} selectedFile={selectedFile}/>
      case UploadStatus.FILESELECTED:
      case UploadStatus.FILEUNSELECTED:
        return <UploadForm changeHandler={changeHandler} uploadFile={uploadFile} uploadStatus={uploadStatus} selectedFile={selectedFile}/>
    }
  } 

  return (
    <div className='columns is-centered is-gapless'>
      <div className='column is-four-fifths'>
        <br/>
        {renderForm()}
      </div>
    </div>
  )
}
  
export default Upload;