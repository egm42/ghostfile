import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'

const Downloading = ({ downloadFileName, downloadProgress}) => {
  return (
    <form className='box'>
      <div className='is-size-5 has-text-centered'>
        <FontAwesomeIcon icon={faFile} />
        <label>
          {" Downloading " + downloadFileName}
        </label>
      </div>
      <br/>
      <progress className="progress is-large is-primary" value={downloadProgress} max="100">{downloadProgress}%</progress>
    </form>
  )
}
  
export default Downloading;