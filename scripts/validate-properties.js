#!/usr/bin/env node

/**
 * CI/CD and Local Validation Script for Corretora Backhaus Empreendimentos.
 * Checks folder integrity, required files (index.md, thumbnail.jpg), and basic metadata.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.resolve(__dirname, '../src/content/empreendimentos');

console.log('🔍 Iniciando validação dos empreendimentos em:', baseDir);

if (!fs.existsSync(baseDir)) {
  console.error(`❌ Diretório não encontrado: ${baseDir}`);
  process.exit(1);
}

const entries = fs.readdirSync(baseDir, { withFileTypes: true });
const propertyFolders = entries.filter(e => e.isDirectory());

if (propertyFolders.length === 0) {
  console.warn('⚠️ Nenhuma pasta de empreendimento encontrada para validação.');
  process.exit(0);
}

let hasErrors = false;
let totalChecked = 0;

for (const folder of propertyFolders) {
  totalChecked++;
  const folderPath = path.join(baseDir, folder.name);
  console.log(`\n📁 Verificando: ${folder.name}`);

  // 1. Check index.md
  const indexPath = path.join(folderPath, 'index.md');
  if (!fs.existsSync(indexPath)) {
    console.error(`  ❌ [FALHA] Arquivo obrigatório "index.md" não encontrado em ${folder.name}`);
    hasErrors = true;
  } else {
    console.log(`  ✅ index.md presente`);
    
    // Quick frontmatter check
    const content = fs.readFileSync(indexPath, 'utf-8');
    if (!content.startsWith('---')) {
      console.error(`  ❌ [FALHA] index.md não possui bloco de frontmatter YAML (---)`);
      hasErrors = true;
    } else {
      const requiredFields = ['title:', 'tagline:', 'status:', 'location:'];
      for (const field of requiredFields) {
        if (!content.includes(field)) {
          console.error(`  ❌ [FALHA] Campo obrigatório "${field}" ausente no frontmatter`);
          hasErrors = true;
        }
      }
    }
  }

  // 2. Check thumbnail (jpg, jpeg, png, webp)
  const thumbnailFiles = ['thumbnail.jpg', 'thumbnail.jpeg', 'thumbnail.png', 'thumbnail.webp'];
  const hasThumbnail = thumbnailFiles.some(f => fs.existsSync(path.join(folderPath, f)));
  
  if (!hasThumbnail) {
    console.error(`  ❌ [FALHA] Imagem de capa "thumbnail.jpg" (ou .png/.webp) não encontrada em ${folder.name}`);
    hasErrors = true;
  } else {
    console.log(`  ✅ Thumbnail presente`);
  }

  // 3. Check gallery folder
  const galleryPath = path.join(folderPath, 'gallery');
  if (fs.existsSync(galleryPath)) {
    const galleryFiles = fs.readdirSync(galleryPath).filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f));
    console.log(`  ✅ Galeria encontrada (${galleryFiles.length} imagens)`);
  } else {
    console.log(`  ℹ️ Pasta gallery/ não encontrada (utilizando thumbnail como imagem principal)`);
  }
}

console.log('\n----------------------------------------');
if (hasErrors) {
  console.error(`❌ Validação concluída com ERROS em ${totalChecked} empreendimentos.`);
  process.exit(1);
} else {
  console.log(`✨ Sucesso! Todos os ${totalChecked} empreendimentos estão 100% em conformidade com as regras.`);
  process.exit(0);
}
