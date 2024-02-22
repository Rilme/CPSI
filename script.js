function uploadFile() {
  var fileInput = document.getElementById('myFile');
  var file = fileInput.files[0];

  if (file) {
    var formData = new FormData();
    formData.append('file', file);

    fetch('https://your-power-automate-endpoint', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log('File uploaded successfully:', data);
      // Handle success, if needed
    })
    .catch(error => {
      console.error('Error uploading file:', error);
      // Handle error, if needed
    });
  } else {
    console.error('No file selected.');
    // Handle no file selected, if needed
  }
}

var dropArea = document.getElementById('dropArea');

// Drag over
dropArea.ondragover = (e) => {
  e.preventDefault();
  dropArea.classList.add('drag-over-effect');
}

// Drag leave
dropArea.ondragleave = () => {
  dropArea.classList.remove('drag-over-effect');
}

// Drop
dropArea.ondrop = (e) => {
  e.preventDefault();
  dropArea.classList.remove('drag-over-effect');
  if(e.dataTransfer.items){
      [...e.dataTransfer.items].forEach((item) => {
          if(item.kind === 'file'){
              const file = item.getAsFile();
              if(typeValidation(file.type)){
                  uploadFile(file)
              }
          }
      })
  }else{
      [...e.dataTransfer.files].forEach((file) => {
          if(typeValidation(file.type)){
              uploadFile(file)
          }
      })
  }
}

// Function to validate file type
function typeValidation(fileType) {
  // Implement your file type validation logic here
  return true; // Example: Always return true for demonstration purposes
}

// Function to find icon for file
function iconSelector(type) {
  var splitType = (type.split('/')[0] == 'application') ? type.split('/')[1] : type.split('/')[0];
  return splitType + '.png';
}
