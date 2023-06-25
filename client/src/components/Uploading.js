const Uploading = ({ uploadSpeed, uploadProgress, selectedFile }) => {
  return (
    <section className='box'>
      <div className='container'>
        <h3>
          Uploading {selectedFile.name}
        </h3>
        <br/>
        <div>
          <progress className="progress is-large is-primary" value={uploadProgress} max="100">{uploadProgress}%</progress>
        </div>
        <div className="has-text-centered">
          {uploadSpeed}
        </div>
      </div>
    </section>
  )
}
  
export default Uploading;