const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

const pdfPath = path.join('docs', 'empreendimentos', 'Nápoles', 'Nápoles - Folder.pdf');

const dataBuffer = fs.readFileSync(pdfPath);

if (PDFParse) {
  const uint8 = new Uint8Array(dataBuffer);
  const parser = new PDFParse(uint8);
  parser.getText().then(data => {
    console.log('--- EXTRACTED TEXT ---');
    console.log(data);
  }).catch(err => {
    console.error('parser error:', err);
  });
}
