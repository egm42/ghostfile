const UploadSuccess = ({downloadUrl, copyUrl, ttl }) => {
  return (
    <fieldset className='box'>
      <div className='is-size-4 has-text-centered has-text-weight-semibold'>
        <label>
        Copy and share link
        </label>
      </div>
      <div className='is-size-6 has-text-centered has-text-primary-dark'>
        <label>
        File will expire after: {new Date(ttl).toLocaleString()}
        </label>
      </div>
      <br/>
      <div className='field is-grouped'>
        <p className='control'>
          <a className='button is-success is-light is-outlined' onClick={copyUrl}>
            Copy
          </a>
        </p>
        <div className='field-body'>
          <div className='field'>
            <p className='control' onClick={copyUrl}>
              <input className='input is-size-6 has-text-weight-semibold is-family-code' value={downloadUrl} readOnly/>
            </p>
          </div>
        </div>
      </div>
    </fieldset>
  )
}
  
export default UploadSuccess;