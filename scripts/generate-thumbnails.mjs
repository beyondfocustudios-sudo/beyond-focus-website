import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '../public/images/blog');

const W = 960;
const H = 540;

// Cada thumbnail tem uma composição diferente de círculos
const THUMBNAILS = [
  {
    slug: 'brand-film-vs-video-institucional',
    circles: [
      { cx: 160, cy: 200, r: 230 },
      { cx: 780, cy: 120, r: 310 },
      { cx: 580, cy: 490, r: 180 },
    ],
    orangeDots: [{ x: 60, y: 460 }, { x: 120, y: 460 }],
  },
  {
    slug: 'conteudo-redes-sociais-video-ou-fotografia',
    circles: [
      { cx: 300, cy: 540, r: 280 },
      { cx: 850, cy: 80, r: 350 },
      { cx: 100, cy: 150, r: 160 },
    ],
    orangeDots: [{ x: 350, y: 30 }, { x: 380, y: 30 }],
  },
  {
    slug: 'hotelaria-video-hoteis-portugueses-conteudo-visual',
    circles: [
      { cx: 50, cy: 300, r: 260 },
      { cx: 700, cy: 540, r: 320 },
      { cx: 900, cy: 120, r: 190 },
    ],
    orangeDots: [{ x: 60, y: 460 }, { x: 120, y: 460 }],
  },
  {
    slug: 'pacote-conteudo-mensal-vs-projetos-pontuais',
    circles: [
      { cx: 480, cy: 0, r: 290 },
      { cx: 960, cy: 400, r: 240 },
      { cx: 200, cy: 540, r: 200 },
    ],
    orangeDots: [{ x: 60, y: 30 }, { x: 90, y: 30 }],
  },
  {
    slug: 'portal-cliente-beyond-focus-producao-audiovisual',
    circles: [
      { cx: 100, cy: 100, r: 200 },
      { cx: 700, cy: 300, r: 340 },
      { cx: 400, cy: 540, r: 210 },
    ],
    orangeDots: [{ x: 60, y: 460 }, { x: 120, y: 460 }],
  },
  {
    slug: 'portal-cliente-o-que-e-porque-muda-tudo-producao-audiovisual',
    circles: [
      { cx: 240, cy: 440, r: 310 },
      { cx: 820, cy: 60, r: 260 },
      { cx: 960, cy: 500, r: 180 },
    ],
    orangeDots: [{ x: 350, y: 30 }, { x: 385, y: 30 }],
  },
];

function buildSVG({ circles, orangeDots }) {
  const circlesSVG = circles
    .map(
      ({ cx, cy, r }) =>
        `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>`
    )
    .join('\n    ');

  // Orange squares (pause-button icon style) — top-left or custom position
  const sq = 10;
  const gap = 5;
  const orangeSVG = orangeDots
    .map(
      ({ x, y }) =>
        `<rect x="${x}" y="${y}" width="${sq}" height="${sq}" fill="#FA8334"/>`
    )
    .join('\n    ');

  // Progress bar line at bottom-left
  const progressBar = `
    <rect x="40" y="500" width="60" height="3" fill="#FA8334" opacity="0.9"/>
    <rect x="108" y="500" width="30" height="3" fill="#FA8334" opacity="0.5"/>
    <rect x="146" y="500" width="15" height="3" fill="#FA8334" opacity="0.3"/>
  `;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Background gradient: dark petrol -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0d3540;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#071e25;stop-opacity:1"/>
    </linearGradient>
    <!-- Fine grid pattern -->
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- Grid overlay -->
  <rect width="${W}" height="${H}" fill="url(#grid)"/>

  <!-- Geometric arcs -->
  ${circlesSVG}

  <!-- Orange accent squares -->
  ${orangeSVG}

  <!-- Progress bar accent -->
  ${progressBar}
</svg>`;
}

async function generate() {
  for (const config of THUMBNAILS) {
    const svg = buildSVG(config);
    const outputPath = path.join(OUTPUT_DIR, `${config.slug}.jpg`);

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 88 })
      .toFile(outputPath);

    console.log(`✓ ${config.slug}.jpg`);
  }
  console.log('\nDone — 6 thumbnails generated.');
}

generate().catch(console.error);
