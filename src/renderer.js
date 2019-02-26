const { dialog } = require('electron').remote;
const path = require('path');
const storage = require('electron-json-storage');
const {ipcRenderer} = require('electron');

document.getElementById('add-action').addEventListener('click', () => {
  dialog.showOpenDialog({
    properties: ['openFile'], 
    filters: [ { name: "PDFs", extensions: ['pdf'] } ] 
  }, (filepaths) => {
    loadPDF(filepaths);
  });
});

var loadPDF = (filepaths) => {
  const filePath = filepaths[0];
  const viewerEle = document.getElementById('viewer');
  viewerEle.innerHTML = ''; 
  const iframe = document.createElement('iframe');
  iframe.setAttribute("id", "pdf-iframe");
  iframe.setAttribute("onLoad", "addPDFListener()");
  iframe.src = path.resolve(__dirname, `../public/pdfjs/web/viewer.html?file=${filePath}`);
  viewerEle.appendChild(iframe);
  iframe.onload = function(){
    console.log('avx');
    var ifr =document.getElementById('pdf-iframe');
    ifr.contentDocument.body.addEventListener('mouseup', function(){
      var idoc= ifr.contentDocument || ifr.contentWindow.document; // ie compatibility
      document.getElementById("selected-word").value = idoc.getSelection().toString();
    });
  }
}

document.getElementById('setting-action').addEventListener('click', () => {
  document.getElementById('viewer').style.display = "none";
  document.getElementById('settings').style.display = "block";
});

document.getElementById('set-yandex-key').addEventListener('click', () => {
  const key = document.getElementById('key-input').value;
  storage.set('keys', {yandex: key});
});

ipcRenderer.on('set-keys', function() {
  storage.get('keys', function(err, obj){
    if (err){
      console.log(err);
    }
    document.getElementById('key-input').value = obj.yandex;
  });
});