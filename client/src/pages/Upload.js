import { useState } from 'react';
import axios from 'axios';
import { UploadStatus } from '../constants/UploadStatus';
import UploadForm from '../components/UploadForm';
import Uploading from '../components/Uploading';
import UploadSuccess from '../components/UploadSuccess';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [uploadStatus, setUploadStatus] = useState(UploadStatus.FILEUNSELECTED);
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadTtl, setUploadTtl] = useState();
  const [canUpload, setCanUpload] = useState(false);
  const [fileSizeError, setFileSizeError] = useState(false);

  const FILE_SIZE_LIMIT = 2147483648;

  function changeHandler(event) {
    if (event.target.files.length > 0) {
      console.log(event.target.files[0]);

      if (event.target.files[0].size > FILE_SIZE_LIMIT) {
        setCanUpload(false);
        setFileSizeError(true);
        setSelectedFile(null);
        setUploadStatus(UploadStatus.FILEUNSELECTED)

      } else {
        setCanUpload(true);
        setFileSizeError(false);
        setSelectedFile(event.target.files[0]);
        setUploadStatus(UploadStatus.FILESELECTED)
      }
    }
  }

  function onUploadProgress(e) {
    const percent = Math.floor((e.loaded * 100) / e.total);
    setUploadProgress(percent);
  }

  function uploadFile(e) {
    if (uploadStatus === UploadStatus.FILESELECTED) {
      setUploadStatus(UploadStatus.UPLOADING);
      axios.post('/api/upload', {
        file: selectedFile
      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress
      }).then(res => {
        switch(res.status) {
          case 200:
            setDownloadUrl(window.location.origin + res.data.url);
            setUploadStatus(UploadStatus.UPLOADSUCCESS);
            setUploadTtl(res.data.ttl)
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
      navigator.clipboard.writeText(downloadUrl);
    } catch (e) {
      console.log(e);
    }
  }

  function renderForm() {
    switch(uploadStatus) {
      case UploadStatus.UPLOADSUCCESS:
        return <UploadSuccess downloadUrl={downloadUrl} copyUrl={copyUrl} ttl={uploadTtl}/>
      case UploadStatus.UPLOADING:
        return <Uploading uploadProgress={uploadProgress} selectedFile={selectedFile}/>
      case UploadStatus.UPLOADFAILED:
      case UploadStatus.FILESELECTED:
      case UploadStatus.FILEUNSELECTED:
      default:
        return <UploadForm changeHandler={changeHandler} uploadFile={uploadFile} uploadStatus={uploadStatus} selectedFile={selectedFile} canUpload={canUpload} fileSizeError={fileSizeError}/>
    }
  } 

  return (
    <div className='columns is-centered is-gapless'>
      <div className='column is-four-fifths'>
        <br/>
        <br/>
        {renderForm()}
      </div>
    </div>
  )
}
  
export default Upload;