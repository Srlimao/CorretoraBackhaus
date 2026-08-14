import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const docsDir = './docs';
const napolesSourceDir = path.join(docsDir, 'empreendimentos', 'Nápoles');
const brokerSourceImg = path.join(docsDir, 'corretor_imagem.jpg');

const targetPropertyDir = './src/content/empreendimentos/napoles';
const targetGalleryDir = path.join(targetPropertyDir, 'gallery');
const targetPublicDir = './public/images';

console.log('🚀 Iniciando script de otimização de imagens...');

// Ensure directories exist
fs.mkdirSync(targetGalleryDir, { recursive: true });
fs.mkdirSync(targetPublicDir, { recursive: true });

async function optimizeBrokerImage() {
  if (fs.existsSync(brokerSourceImg)) {
    console.log('📸 Otimizando foto da corretora...');
    await sharp(brokerSourceImg)
      .resize(1000, 1000, { fit: 'cover', position: 'top' })
      .jpeg({ quality: 88, progressive: true })
      .toFile(path.join(targetPublicDir, 'catia-backhaus.jpg'));
    
    // Also keep an original copy
    fs.copyFileSync(brokerSourceImg, path.join(targetPublicDir, 'corretor-original.jpg'));
    console.log('✅ Foto da corretora otimizada com sucesso.');
  }
}

async function processNapolesImages() {
  if (!fs.existsSync(napolesSourceDir)) {
    console.error('❌ Diretório de origem não encontrado:', napolesSourceDir);
    return;
  }

  const files = fs.readdirSync(napolesSourceDir);
  console.log(`📁 Encontrados ${files.length} arquivos em ${napolesSourceDir}`);

  // Mapping files to clean normalized names
  const galleryMappings = [
    { src: 'Nápoles - Fachada 1.png', destThumb: true, destGallery: '01-fachada-principal.jpg' },
    { src: 'Nápoles - Fachada 3.png', destGallery: '02-fachada-torres.jpg' },
    { src: 'Nápoles - Piscina.png', destGallery: '03-piscina.jpg' },
    { src: 'Nápoles - Salão de Festas.png', destGallery: '04-salao-de-festas.jpg' },
    { src: 'Nápoles - Academia.png', destGallery: '05-academia-fitness.jpg' },
    { src: 'Nápoles - Coworking.png', destGallery: '06-coworking.jpg' },
    { src: 'Nápoles - Kids.png', destGallery: '07-espaco-kids.jpg' },
    { src: 'Nápoles - Playground.png', destGallery: '08-playground.jpg' },
    { src: 'Nápoles - Quadra Poliesportiva.png', destGallery: '09-quadra-poliesportiva.jpg' },
    { src: 'Nápoles - Quiosques.png', destGallery: '10-quiosques-gourmet.jpg' },
    { src: 'Nápoles - Lounge Externo.png', destGallery: '11-lounge-externo.jpg' },
    { src: 'Nápoles - Market Place.png', destGallery: '12-mini-market.jpg' },
    { src: 'Nápoles - Pet Place 1.png', destGallery: '13-pet-place.jpg' },
    { src: 'Nápoles - Hall.png', destGallery: '14-hall-de-entrada.jpg' },
    { src: 'Nápoles - Garagem.png', destGallery: '15-edificio-garagem.jpg' },
    { src: 'Nápoles - Planta 47 m².png', destGallery: '16-planta-47m2-2-dormitorios.jpg' },
    { src: 'Nápoles - Planta 43 m².png', destGallery: '17-planta-43m2-2-dormitorios.jpg' },
    { src: 'Implantação.png', destGallery: '18-implantacao-geral.jpg' },
    { src: 'Nápoles - Infraestrutura.png', destGallery: '19-infraestrutura.jpg' },
  ];

  for (const item of galleryMappings) {
    const srcPath = path.join(napolesSourceDir, item.src);
    if (!fs.existsSync(srcPath)) {
      console.warn(`⚠️ Arquivo não encontrado: ${item.src}`);
      continue;
    }

    const stat = fs.statSync(srcPath);
    console.log(`⏳ Processando: ${item.src} (${(stat.size / 1024 / 1024).toFixed(2)} MB)...`);

    if (item.destThumb) {
      const thumbPath = path.join(targetPropertyDir, 'thumbnail.jpg');
      await sharp(srcPath)
        .resize(1280, 800, { fit: 'cover', position: 'center' })
        .jpeg({ quality: 85, progressive: true })
        .toFile(thumbPath);
      const thumbStat = fs.statSync(thumbPath);
      console.log(`  ✨ Thumbnail criada: ${(thumbStat.size / 1024).toFixed(1)} KB`);
    }

    if (item.destGallery) {
      const galleryOutPath = path.join(targetGalleryDir, item.destGallery);
      await sharp(srcPath)
        .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 82, progressive: true })
        .toFile(galleryOutPath);
      const gStat = fs.statSync(galleryOutPath);
      console.log(`  ✨ Galeria salva (${item.destGallery}): ${(gStat.size / 1024).toFixed(1)} KB`);
    }
  }
}

async function run() {
  await optimizeBrokerImage();
  await processNapolesImages();
  console.log('\n🎉 Otimização de imagens concluída com sucesso!');
}

run().catch(err => {
  console.error('Erro na otimização de imagens:', err);
  process.exit(1);
});
