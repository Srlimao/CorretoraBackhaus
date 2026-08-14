import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';

const pdfPath = path.join('docs', 'empreendimentos', 'Nápoles', 'Nápoles - Folder.pdf');

const dataBuffer = fs.readFileSync(pdfPath);

pdfParse(dataBuffer).then(data => {
  console.log('Total pages:', data.numpages);
  console.log('Metadata:', data.info);
  console.log('\n--- EXTRACTED TEXT ---\n');
  console.log(data.text);
}).catch(err => {
  console.error('Error parsing PDF:', err);
});
