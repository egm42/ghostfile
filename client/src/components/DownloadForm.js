import FileDetails from "./FileDetails";

const DownloadForm = ({ fileDetails, downloadFile }) => {
  return (
    <form className='box'>
      <FileDetails fileDetails={fileDetails}/>
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