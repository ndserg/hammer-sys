const fakeUpload = (file) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(file.onSuccess())
    }, 500)
  })
};

const downloadJSON = (data) => {
  const fileName = `schema-${Date.now()}`;
  const jsonData = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const jsonURL = URL.createObjectURL(jsonData);
  const link = document.createElement('a');
  link.href = jsonURL;
  link.download = `${fileName}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const jsonFileUpload = (info, onFileUploadSuccess, onError) => {
  const file = info.file;

  if (file.status === 'done') {
    const fileReader = new FileReader();
    fileReader.readAsText(file.originFileObj, "UTF-8");
    fileReader.onload = () => {
      const data = JSON.parse(fileReader.result);
      onFileUploadSuccess(data);
    };
  } else if (file.status === 'error') {
      onError('File upload failed.');
  }
};

export {
  fakeUpload,
  downloadJSON,
  jsonFileUpload
}