const FileDetails = ({ fileDetails }) => {
  function readableSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
      return 'n/a';
    }
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i === 0) {
      return bytes + ' ' + sizes[i];
    }
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

  return (
    <div>
      <div className='is-size-5 has-text-centered'>
        <i class="fa-solid fa-file"></i>
        <label>
        {" " + fileDetails.originalname}
        </label>
      </div>
      <div className='is-size-6 has-text-centered has-text-primary-dark is-italic'>
        <p>Size: {readableSize(fileDetails.size)}</p>
      </div>
      <div className='is-size-6 has-text-centered has-text-primary-dark is-italic'>
        <label>
        File will expire after: {new Date(fileDetails.ttl).toLocaleString()}
        </label>
      </div>
    </div>
    
  )
}
    
export default FileDetails;