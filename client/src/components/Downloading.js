const Downloading = ({ downloadFileName, downloadProgress}) => {
  return (
    <form className='box'>
      <div className='is-size-5 has-text-centered'>
        <i class="fa-solid fa-file"></i>
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