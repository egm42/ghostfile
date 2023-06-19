import React from "react"
import { DownloadStatus } from "../constants/DownloadStatus";
import DownloadForm from "../components/DownloadForm";

class Download extends React.Component {
// const Download = ({getFileDetails, file}) => {
  constructor(props) {
    super(props);
    const queryParameters = new URLSearchParams(window.location.search)
    this.props.getFileDetails(queryParameters.get('id'));
   
  }

  renderForm() {
    // switch(this.props.downloadStatus) {
    //   case DownloadStatus.FILENOTFOUND:
    return <DownloadForm downloadStatus={this.props.downloadStatus} downloadFileName={this.props.downloadFileName} downloadFile={this.props.downloadFile}/>
      // case DownloadStatus.FILEFOUND:
      //   return <DownloadForm />
      // case DownloadStatus.DOWNLOADING:
      //   return <DownloadForm />
      // case DownloadStatus.DOWNLOADFAILED:
      //   return <DownloadForm />
      // case DownloadStatus.DOWNLOADSUCCESS:
      //   return <DownloadForm />

      // FILENOTFOUND: 'filenotfound',
      // DOWNLOADING: 'downloading',
      // FILEFOUND: 'filefound',
      // DOWNLOADFAILED: 'downloadfailed',
      // DOWNLOADSUCCESS: 'downloadsuccess'
      // case UploadStatus.UPLOADFAILED:
      //   return <UploadForm changeHandler={changeHandler} uploadFile={uploadFile} uploadStatus={uploadStatus} selectedFile={selectedFile}/>
      // case UploadStatus.UPLOADSUCCESS:
      //   return <UploadSuccess downloadUrl={downloadUrl} copyUrl={copyUrl}/>
      // case UploadStatus.UPLOADING:
      //   return <Uploading uploadProgress={uploadProgress} selectedFile={selectedFile}/>
      // case UploadStatus.FILESELECTED:
      // case UploadStatus.FILEUNSELECTED:
      //   return <UploadForm changeHandler={changeHandler} uploadFile={uploadFile} uploadStatus={uploadStatus} selectedFile={selectedFile}/>
    // }
  } 

  render() {
    return (
        <div>
          <h1>test</h1>
          {this.renderForm()}
          <h1>test2</h1>
        </div>
    
    )
  }
}
  
export default Download;