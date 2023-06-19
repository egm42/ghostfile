import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { DownloadStatus } from '../constants/DownloadStatus'

const DownloadForm = ({ downloadStatus, downloadFileName, downloadFile}) => {
  return (
    <form className='box'>
      <div className='is-size-5 has-text-centered'>
        <label>
          {downloadFileName}
        </label>
      </div>
      <br/>
      {/* <div className='file is-large is-centered'>
        <label className='file-label'>
          <input className='file-input' type='file' name='file' onChange={changeHandler}/>
          <span className='file-cta'>
            <span className='file-icon'>
              <FontAwesomeIcon icon={faFileUpload} />
            </span>
            <span className='file-label'>
              {
                DownloadStatus === DownloadStatus.FILESELECTED
                ?
                selectedFile.name
                :
                'Select File'
              }
            </span>
          </span>
        </label>
      </div> */}
      <br/>
      <div className='field is-grouped is-grouped-centered' onClick={downloadFile}>
        <p className='control'>
          <a className='button is-primary is-light is-outlined'>
            Download File
          </a>
        </p>
      </div>
    </form>
  )
}
  
export default DownloadForm;