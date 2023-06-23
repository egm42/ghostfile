const DownloadForm = ({ downloadFileName, downloadFile, ttl }) => {
  return (
    <form className='box'>
      <div className='is-size-5 has-text-centered'>
        <i class="fa-solid fa-file"></i>
        <label>
          {" " + downloadFileName}
        </label>
      </div>
            <div className='is-size-6 has-text-centered has-text-primary-dark'>
        <label>
        File will expire after: {new Date(ttl).toLocaleString()}
        </label>
      </div>
      <br/>
      <div className='field is-grouped is-grouped-centered' >
        <p className='control'>
          <a className='button is-primary is-light is-outlined' onClick={downloadFile}>
            Download File
          </a>
        </p>
      </div>
    </form>
  )
}
  
export default DownloadForm;