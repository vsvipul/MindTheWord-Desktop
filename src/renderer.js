const { dialog } = require('electron').remote;
const path = require('path');

document.getElementById('myButton').addEventListener('click', () => {
  dialog.showOpenDialog({
    properties: ['openFile'], 
    filters: [ { name: "PDFs", extensions: ['pdf'] } ] 
  }, (filepaths) => {
    const filePath = filepaths[0];
    const viewerEle = document.getElementById('viewer');
    viewerEle.innerHTML = ''; 
    const iframe = document.createElement('iframe');
    iframe.setAttribute("id", "pdf-iframe");
    iframe.setAttribute("onLoad", "addPDFListener()");
    iframe.src = path.resolve(__dirname, `../public/pdfjs/web/viewer.html?file=${filePath}`);
    viewerEle.appendChild(iframe);
    iframe.onload = function() {
      var ifr =document.getElementById('pdf-iframe');
      ifr.contentDocument.body.addEventListener('contextmenu', function(){
        var idoc= ifr.contentDocument || ifr.contentWindow.document; // ie compatibility
        console.log(idoc.getSelection().toString());
      });
    }
  });
});
