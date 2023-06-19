const UploadSuccess = ({downloadUrl, copyUrl}) => {
  return (
    <fieldset className='box'>
      <div className='is-size-5 has-text-centered has-text-weight-semibold'>
        <label>
        Copy and share link
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
            <p className='control'>
              <input className='input is-static is-size-6 has-text-weight-semibold is-family-code' value={downloadUrl} readOnly/>
            </p>
          </div>
        </div>
      </div>
    </fieldset>
  )
}
  
export default UploadSuccess;