import fs from 'fs';
import path from 'path';

const brainDir = "C:/Users/will_/.gemini/antigravity-ide/brain/35f06df4-09f1-4174-886b-7578bde888dc";

const brokerImg = path.join(brainDir, "catia_backhaus_broker_1786707437581.jpg");
const alphaImg = path.join(brainDir, "alpha_facade_1786707449037.jpg");
const solarImg = path.join(brainDir, "solar_facade_1786707461578.jpg");
const villaImg = path.join(brainDir, "villa_facade_1786707474437.jpg");
const costaImg = path.join(brainDir, "costa_facade_1786707490615.jpg");

const livingImg = path.join(brainDir, "gallery_living_1786707507596.jpg");
const suiteImg = path.join(brainDir, "gallery_suite_1786707523094.jpg");
const poolImg = path.join(brainDir, "gallery_pool_1786707538153.jpg");
const gourmetImg = path.join(brainDir, "gallery_gourmet_1786707557250.jpg");
const floorplanImg = path.join(brainDir, "gallery_floorplan_1786707576890.jpg");

fs.mkdirSync("./public/images", { recursive: true });
if (fs.existsSync(brokerImg)) {
  fs.copyFileSync(brokerImg, "./public/images/catia-backhaus.jpg");
}

const properties = [
  { slug: "residencial-alpha", thumb: alphaImg },
  { slug: "solar-dos-ventos", thumb: solarImg },
  { slug: "villa-imperiale-residence", thumb: villaImg },
  { slug: "costa-esmeralda-exclusive", thumb: costaImg }
];

for (const p of properties) {
  const pDir = `./src/content/empreendimentos/${p.slug}`;
  const gDir = `${pDir}/gallery`;
  fs.mkdirSync(gDir, { recursive: true });
  
  if (fs.existsSync(p.thumb)) {
    fs.copyFileSync(p.thumb, `${pDir}/thumbnail.jpg`);
  }
  if (fs.existsSync(livingImg)) fs.copyFileSync(livingImg, `${gDir}/01-living-integrado.jpg`);
  if (fs.existsSync(suiteImg)) fs.copyFileSync(suiteImg, `${gDir}/02-suite-master.jpg`);
  if (fs.existsSync(poolImg)) fs.copyFileSync(poolImg, `${gDir}/03-piscina-e-lazer.jpg`);
  if (fs.existsSync(gourmetImg)) fs.copyFileSync(gourmetImg, `${gDir}/04-sacada-gourmet.jpg`);
  if (fs.existsSync(floorplanImg)) fs.copyFileSync(floorplanImg, `${gDir}/05-planta-humanizada.jpg`);
}

console.log("Property images and galleries organized successfully!");
