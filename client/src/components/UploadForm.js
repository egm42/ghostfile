import { UploadStatus } from '../constants/UploadStatus'

const UploadForm = ({changeHandler, uploadFile, uploadStatus, selectedFile, canUpload, fileSizeError}) => {
  

  return (
    <form className='box'>
      <div className='is-size-5 has-text-centered'>
        <label>
        Select and upload a file to create a one-time download link. File uploads are limited to 2GB.
        </label>
      </div>
      <div className='is-size-6 has-text-centered'>
        <label className='has-text-primary-dark'>
        Files expire after 7 days
        </label>
      </div>
      <br/>
      <div className='file is-large is-centered'>
        <label className='file-label'>
          <input className='file-input' type='file' name='file' onChange={changeHandler}/>
          <span className={fileSizeError ? "file-cta has-background-danger-light" : "file-cta"}>
            <span className='file-icon'>
              <i className="fa-solid fa-file"></i>
            </span>
            <span className='file-label'>
              {
                uploadStatus === UploadStatus.FILESELECTED
                ?
                selectedFile.name
                :
                fileSizeError
                ?
                'File over 2GB'
                :
                'Select File'
              }
            </span>
          </span>
        </label>
      </div>
      <br/>
      <div className='field is-grouped is-grouped-centered' onClick={uploadFile} >
        <p className='control'>
          <button className='button is-primary is-light is-outlined' disabled={!canUpload}>
            Upload File
          </button>
        </p>
      </div>
    </form>
  )
}
  
export default UploadForm;