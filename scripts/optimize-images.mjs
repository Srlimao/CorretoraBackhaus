import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const docsDir = './docs/empreendimentos';
const targetBaseDir = './src/content/empreendimentos';
const publicDir = './public/images';

console.log('🚀 Iniciando processamento e otimização completa de imagens...');

fs.mkdirSync(publicDir, { recursive: true });

// Optimize broker image if present
async function optimizeBrokerImage() {
  const brokerSourceImg = './docs/corretor_imagem.jpg';
  if (fs.existsSync(brokerSourceImg)) {
    console.log('📸 Otimizando foto da corretora...');
    await sharp(brokerSourceImg)
      .resize(1200, null, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 90, progressive: true })
      .toFile(path.join(publicDir, 'catia-backhaus.jpg'));
    console.log('✅ Foto da corretora atualizada.');
  }
}

const propertyConfigs = [
  {
    slug: 'napoles',
    sourceDir: path.join(docsDir, 'Nápoles'),
    mappings: [
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
    ]
  },
  {
    slug: 'casa-tua',
    sourceDir: path.join(docsDir, 'Casa Tua'),
    mappings: [
      { src: '01-Pórtico.png', destThumb: true, destGallery: '01-portico-de-entrada.jpg' },
      { src: '02-Fachada_2D-R01.png', destGallery: '02-fachada-casas.jpg' },
      { src: '03-Piscina_Adulto.png', destGallery: '03-piscina-adulto-e-infantil.jpg' },
      { src: 'CT2 (002).jpg', destGallery: '04-living-integrado.jpg' },
      { src: 'Feed.jpg', destGallery: '05-club-house-e-lazer.jpg' },
      { src: 'Feed2.jpg', destGallery: '06-condominio-fechado.jpg' },
      { src: 'Card 01 CT.jpg', destGallery: '07-perspectiva-sobrados.jpg' },
      { src: '01-PB-Térreo_4D-R01.png', destGallery: '08-planta-terreo-4-dormitorios.jpg' },
      { src: '02-PB-2pav_4D-R01.png', destGallery: '09-planta-2-pavimento-4-dormitorios.jpg' },
      { src: '48-PB-3pav_Suite_4D-R01.jpg', destGallery: '10-planta-3-pavimento-suite.jpg' },
      { src: '47-PB-4pav_4D.png', destGallery: '11-planta-cobertura-terraco.jpg' },
    ]
  },
  {
    slug: 'linq-your-place',
    sourceDir: path.join(docsDir, 'Linq Your Place'),
    mappings: [
      { src: 'Cópia de 01-Fachada_diurna.png', destThumb: true, destGallery: '01-fachada-diurna.jpg' },
      { src: 'Cópia de 02-Fachada_noturna.png', destGallery: '02-fachada-noturna.jpg' },
      { src: 'Cópia de 03-Foto-inserção.png', destGallery: '03-insercao-urbana.jpg' },
      { src: 'Cópia de 04-Fachada_lojas-R02.png', destGallery: '04-linq-mall-lojas.jpg' },
      { src: 'Cópia de 12-Piscina.png', destGallery: '05-piscina-e-deck-molhado.jpg' },
      { src: 'Cópia de 11-Aerea_Lazer.png', destGallery: '06-vista-aerea-lazer.jpg' },
      { src: 'Cópia de 05-Salão_Festas.png', destGallery: '07-salao-de-festas.jpg' },
      { src: 'Cópia de 15-Gourmet_Externo.png', destGallery: '08-quiosque-gourmet.jpg' },
      { src: 'Cópia de 16-Gourmet_estar.png', destGallery: '09-espaco-gourmet-e-estar.jpg' },
      { src: 'Cópia de 08-Academia.png', destGallery: '10-academia-fitness.jpg' },
      { src: 'Cópia de 09-Coworking.png', destGallery: '11-coworking.jpg' },
      { src: 'Cópia de 06-Kids.png', destGallery: '12-brinquedoteca.jpg' },
      { src: 'Cópia de 13-Playground.png', destGallery: '13-playground.jpg' },
      { src: 'Cópia de 14-Mini_quadra.png', destGallery: '14-mini-quadra-poliesportiva.jpg' },
      { src: 'Cópia de 17-Fireplace.png', destGallery: '15-fire-place-lounge.jpg' },
      { src: 'Cópia de 18-Pet_Place.png', destGallery: '16-pet-place.jpg' },
      { src: 'Cópia de 07-Bicicletário-R02.png', destGallery: '17-bicicletario.jpg' },
      { src: 'Cópia de 19-Living.png', destGallery: '18-living-decorado.jpg' },
      { src: 'Cópia de 20-Cozinha.png', destGallery: '19-cozinha-integrada.jpg' },
      { src: 'Cópia de 21-Dormitório.png', destGallery: '20-dormitorio-casal.jpg' },
      { src: 'Cópia de 22-Kids.png', destGallery: '21-dormitorio-infantil.jpg' },
      { src: 'Cópia de 23-Banheiro.png', destGallery: '22-banheiro.jpg' },
      { src: 'Cópia de 24-PB-TER.png', destGallery: '23-implantacao-terreo.jpg' },
      { src: 'Cópia de 25-PB-02P.png', destGallery: '24-implantacao-2-pavimento.jpg' },
      { src: 'Cópia de 26-PB-Frente.png', destGallery: '25-planta-apartamento-frente-47m2.jpg' },
      { src: 'Cópia de 27-PB-Fundo.png', destGallery: '26-planta-apartamento-fundos-48m2.jpg' },
      { src: 'Cópia de 28-PB-Meio.png', destGallery: '27-planta-apartamento-meio-46m2.jpg' },
    ]
  },
  {
    slug: 'ora-condominio-residencial',
    sourceDir: path.join(docsDir, 'Ora'),
    mappings: [
      { src: '4bc6c917159e8f2168b94e17d7585aa5.png', destThumb: true, destGallery: '01-portico-de-entrada.jpg' },
      { src: 'b215d9b6abacadedf076661611397e2d.png', destGallery: '02-torre-b-fachada.jpg' },
      { src: '58555b8c6a91e238b55e0a58a3535f97.png', destGallery: '03-piscinas-adulto-e-infantil.jpg' },
      { src: '1a0b6d332217394f3be8457c20c3c6e6.png', destGallery: '04-salao-de-festas.jpg' },
      { src: 'dcfa9de106188b504e833d5917ea04e8.png', destGallery: '05-espaco-gourmet.jpg' },
      { src: '039f59177b1471513798d61ea11b9e27.png', destGallery: '06-sala-de-jogos.jpg' },
      { src: '961e279e34cf55c484f3fc143e303a78.png', destGallery: '07-brinquedoteca.jpg' },
      { src: '24db7e31e6fc0e7e1bc6b3d8af942b12.png', destGallery: '08-playground.jpg' },
      { src: '2eff48f95803a55370ac99837e7fdaca.png', destGallery: '09-quadra-esportiva-infantil.jpg' },
      { src: 'eb061de64df646d0cde5139c801abc77.png', destGallery: '10-living-decorado.jpg' },
      { src: '073d976a4eb7a74cb1c4c8d224bde3c8.png', destGallery: '11-living-estendido.jpg' },
      { src: 'a057ade907c360951aefec13d0e88607.png', destGallery: '12-dormitorio-casal.jpg' },
      { src: '4b39a86ae1e7849c51fc04703a85bf14.png', destGallery: '13-ora-condominio.jpg' },
      { src: '146d62cf98075227d16a7b1fc2b5763c.png', destGallery: '14-diferenciais.jpg' },
      { src: '3e9ab8fd5825483983986c8057b1bf2e.png', destGallery: '15-areas-de-uso-comum.jpg' },
      { src: '4e14977d58888cdd1e772af8b288cd6f.png', destGallery: '16-implantacao-torre-garden.jpg' },
      { src: '5458c44834dc6404b805cf51a0f45884.png', destGallery: '17-disposicao-das-unidades.jpg' },
      { src: 'f7f6e519bdf003e2cfa1a4776e290c1a.png', destGallery: '18-vagas-de-estacionamento.jpg' },
      { src: '71a905ec5d01010c29cf43744bc08731.png', destGallery: '19-planta-60m2-3-dormitorios.jpg' },
      { src: '4c7df830d152c947e19b0b75a0c15a62.png', destGallery: '20-planta-60m2-living-estendido.jpg' },
      { src: '90e8ffc054cc48a7f91c6dd026b46140.png', destGallery: '21-planta-49m2-2-dormitorios.jpg' },
      { src: '7f89de859fccd704f838287f4a678c90.png', destGallery: '22-planta-48m2-2-dormitorios.jpg' },
      { src: 'dcf30fa3defe287a9d2cf997a93aec06.png', destGallery: '23-planta-48m2-living-estendido.jpg' },
      { src: '5ad0da3b92d7fdb2765e0ecb473c6056.png', destGallery: '24-planta-garden-101m2.jpg' },
      { src: '71e2cbbeb6e5a5ec34666a60a209f7f4.png', destGallery: '25-planta-garden-105m2.jpg' },
    ]
  },
  {
    slug: 'residencial-ares',
    sourceDir: path.join(docsDir, 'Áres'),
    mappings: [
      { src: 'ccbeef0e66cea5deee468fea992f672b.png', destThumb: true, destGallery: '01-fachada-torre.jpg' },
      { src: 'e267f3200d931bdabdc9d3fc2965d2e7.png', destGallery: '02-rooftop-3-pavimento-lazer.jpg' },
      { src: '927a2f516e8c9c864f9e64db57816f62.png', destGallery: '03-implantacao-terreo-lojas.jpg' },
      { src: '02248bace387d20b0dfae55cb88f9e11.png', destGallery: '04-implantacao-2-pavimento-vagas.jpg' },
      { src: '13f4df40a25f7124cb1f097884f35009.png', destGallery: '05-implantacao-subsolo.jpg' },
      { src: '860100dc2bc9f961b9f54e640f383200.png', destGallery: '06-ficha-tecnica-e-diferenciais.jpg' },
      { src: '043694cb6a3eb9b08578319b7a0a5af0.png', destGallery: '07-planta-tipo-a-54m2-2-dormitorios.jpg' },
      { src: 'fea58e945838d91ad78e9dc4a89c773c.png', destGallery: '08-planta-tipo-b-57m2-2-dormitorios-suite.jpg' },
      { src: 'ef18b047ce59ec723ecaa2bd056d38a6.png', destGallery: '09-planta-tipo-c-60m2-2-dormitorios-suite.jpg' },
      { src: '3be0eaeb64b3fe2e8bd1afbcb9e3ff17.png', destGallery: '10-planta-tipo-d-68m2-3-dormitorios-suite.jpg' },
      { src: 'd6e271090a12d4837216fe58ded0c654.png', destGallery: '11-planta-tipo-d-68m2-living-estendido.jpg' },
    ]
  },
  {
    slug: 'varandas-residence',
    sourceDir: path.join(docsDir, 'Varandas'),
    mappings: [
      { src: 'FLEX_FACHADA DETALHE.png', destThumb: true, destGallery: '01-fachada-edificio.jpg' },
      { src: 'FLEX_PISCNA 2.png', destGallery: '02-piscina-rooftop.jpg' },
      { src: 'FLEX_AEREA PISCINA.png', destGallery: '03-vista-aerea-piscina.jpg' },
      { src: 'FLEX_FOTOMONTAGEM 2.png', destGallery: '04-fotomontagem-aerea.jpg' },
      { src: 'FLEX_FOTOMONTAGEM 3.png', destGallery: '05-localizacao-e-vista.jpg' },
      { src: 'FLEX_CINEMA.png', destGallery: '06-cinema-privativo.jpg' },
      { src: 'FLEX_FIREPLACE.png', destGallery: '07-fireplace-lounge.jpg' },
      { src: 'FLEX_APOIO ACADEMIA.png', destGallery: '08-academia-fitness.jpg' },
      { src: '05.FLEX_LIVING VARANDA.png', destGallery: '09-living-integrado-com-varanda.jpg' },
      { src: '01.FLEX_LIVING EXTENDIDO.png', destGallery: '10-living-estendido.jpg' },
      { src: '02.FLEX_LIVING DECORADO.png', destGallery: '11-living-decorado.jpg' },
      { src: '02.FLEX_LIVING DECORADO 2.png', destGallery: '12-living-estar-e-jantar.jpg' },
      { src: '03.FLEX_LIVING 2 DORMITÓRIOS.png', destGallery: '13-living-apartamento-2-dormitorios.jpg' },
      { src: '06.FLEX_LIVING GARDEN EXTERNO.png', destGallery: '14-living-garden-externo.jpg' },
      { src: '08.FLEX_LIVING GARDEN VARANDA.png', destGallery: '15-living-garden-varanda.jpg' },
      { src: 'FLEX_SUITE DECORADO.png', destGallery: '16-suite-master-decorada.jpg' },
      { src: 'FLEX_COZINHA DECORADO.png', destGallery: '17-cozinha-gourmet.jpg' },
      { src: '07.FLEX_PH 2 DORMITORIOS.png', destGallery: '18-planta-2-dormitorios-com-suite.jpg' },
      { src: '07.FLEX_PH 3 DORMITORIOS COM VARANDA.png', destGallery: '19-planta-3-dormitorios-com-varanda.jpg' },
      { src: '02.FLEX_PH DECORADO.png', destGallery: '20-planta-decorada.jpg' },
    ]
  }
];

async function processProperties() {
  for (const prop of propertyConfigs) {
    console.log(`\n🏢 Processando empreendimento: ${prop.slug}`);
    const targetPropDir = path.join(targetBaseDir, prop.slug);
    const targetGalleryDir = path.join(targetPropDir, 'gallery');

    fs.mkdirSync(targetGalleryDir, { recursive: true });

    if (!fs.existsSync(prop.sourceDir)) {
      console.warn(`⚠️ Pasta de origem não existe: ${prop.sourceDir}`);
      continue;
    }

    for (const item of prop.mappings) {
      const srcPath = path.join(prop.sourceDir, item.src);
      if (!fs.existsSync(srcPath)) {
        console.warn(`  ⚠️ Arquivo não encontrado: ${item.src}`);
        continue;
      }

      if (item.destThumb) {
        const thumbPath = path.join(targetPropDir, 'thumbnail.jpg');
        await sharp(srcPath)
          .resize(1280, 800, { fit: 'cover', position: 'center' })
          .jpeg({ quality: 85, progressive: true })
          .toFile(thumbPath);
        console.log(`  ✨ Thumbnail criada para ${prop.slug}`);
      }

      if (item.destGallery) {
        const galleryOutPath = path.join(targetGalleryDir, item.destGallery);
        await sharp(srcPath)
          .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 82, progressive: true })
          .toFile(galleryOutPath);
        console.log(`  🖼️ Galeria salva: ${item.destGallery}`);
      }
    }
  }
}

async function run() {
  await optimizeBrokerImage();
  await processProperties();
  console.log('\n🎉 Todas as imagens foram processadas e otimizadas com sucesso!');
}

run().catch(err => {
  console.error('Erro na otimização:', err);
  process.exit(1);
});
