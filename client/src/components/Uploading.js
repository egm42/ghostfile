const Uploading = ({uploadProgress, selectedFile}) => {
  return (
    <section className='box'>
      <div className='container'>
        <h3>
          Uploading {selectedFile.name}
        </h3>
        <br/>
        <progress className="progress is-large is-primary" value={uploadProgress} max="100">{uploadProgress}%</progress>
      </div>
    </section>
  )
}
  
export default Uploading;