import React from "react"
import { DownloadStatus } from "../constants/DownloadStatus";
import DownloadSuccess from "../components/DownloadSuccess";
import DownloadFail from "../components/DownloadFail";
import DownloadForm from "../components/DownloadForm";
import Downloading from '../components/Downloading';

class Download extends React.Component {
  constructor(props) {
    super(props);
    const queryParameters = new URLSearchParams(window.location.search)
    this.props.getFileDetails(queryParameters.get('id'));
  }

  renderForm() {
    switch(this.props.downloadStatus) {
      case DownloadStatus.FILEFOUND:
        return <DownloadForm downloadStatus={this.props.downloadStatus} downloadFileName={this.props.downloadFileName} downloadFile={this.props.downloadFile} ttl={this.props.ttl}/>
      case DownloadStatus.DOWNLOADSUCCESS:
        return <DownloadSuccess />
      case DownloadStatus.DOWNLOADING:
        return <Downloading downloadFileName={this.props.downloadFileName} downloadProgress={this.props.downloadProgress}/>
      case DownloadStatus.FILENOTFOUND:
      case DownloadStatus.DOWNLOADFAILED:
      default:
        return <DownloadFail />
    }
  } 

  render() {
    return (
      <div className='columns is-centered is-gapless'>
        <div className='column is-four-fifths'>
          <br/>
          {this.renderForm()}
        </div>
      </div>
    )
  }
}
  
export default Download;