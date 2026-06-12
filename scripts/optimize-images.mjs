// Ottimizzazione automatica delle immagini caricate dal CMS.
//
// Cosa fa, in parole semplici:
//  - guarda tutte le foto dentro public/uploads
//  - se una foto è troppo grande (lato lungo oltre 2400 px) la rimpicciolisce
//  - la ri-comprime per farla pesare molto meno, mantenendo una buona qualità
//  - NON cambia il nome del file e NON cambia il formato (.jpg resta .jpg),
//    così tutti i collegamenti nel sito continuano a funzionare
//
// È "idempotente": se una foto è già ottimizzata, non viene toccata.
// Viene eseguito da solo da GitHub Actions a ogni caricamento (vedi
// .github/workflows/optimize-images.yml), ma puoi lanciarlo anche a mano:
//   npm run optimize:images

import { readdir, stat, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const UPLOADS_DIR = 'public/uploads';
const MAX_DIMENSION = 2400; // lato lungo massimo in pixel (più che sufficiente per il web)
const JPEG_QUALITY = 82;
const PNG_QUALITY = 80;
const WEBP_QUALITY = 80;
const MIN_SAVING = 0.05; // riscrivi solo se si risparmia almeno il 5%

const SUPPORTED = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const formatKB = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function optimizeFile(path) {
  const input = await readFile(path);
  const ext = extname(path).toLowerCase();

  // .rotate() applica l'orientamento dell'EXIF (foto da telefono) PRIMA di
  // rimuovere i metadati, così le foto non finiscono ruotate.
  const pipeline = sharp(input, { failOn: 'none' }).rotate();
  const meta = await pipeline.metadata();

  const longest = Math.max(meta.width ?? 0, meta.height ?? 0);
  const needsResize = longest > MAX_DIMENSION;
  if (needsResize) {
    pipeline.resize(MAX_DIMENSION, MAX_DIMENSION, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  let output;
  if (ext === '.png') {
    output = await pipeline
      .png({ compressionLevel: 9, quality: PNG_QUALITY, palette: true, effort: 9 })
      .toBuffer();
  } else if (ext === '.webp') {
    output = await pipeline.webp({ quality: WEBP_QUALITY }).toBuffer();
  } else {
    output = await pipeline
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
      .toBuffer();
  }

  const savedRatio = (input.length - output.length) / input.length;

  // Scrivi solo se abbiamo ridimensionato oppure se il risparmio è significativo,
  // e mai se il risultato è più pesante dell'originale.
  if ((needsResize || savedRatio >= MIN_SAVING) && output.length < input.length) {
    await writeFile(path, output);
    return { changed: true, before: input.length, after: output.length, resized: needsResize };
  }
  return { changed: false, before: input.length, after: input.length, resized: false };
}

async function main() {
  let entries;
  try {
    entries = await readdir(UPLOADS_DIR);
  } catch {
    console.log(`Cartella "${UPLOADS_DIR}" non trovata: niente da ottimizzare.`);
    return;
  }

  const files = entries.filter((f) => SUPPORTED.has(extname(f).toLowerCase()));
  let totalBefore = 0;
  let totalAfter = 0;
  let changedCount = 0;

  for (const file of files) {
    const path = join(UPLOADS_DIR, file);
    if (!(await stat(path)).isFile()) continue;
    try {
      const r = await optimizeFile(path);
      totalBefore += r.before;
      totalAfter += r.after;
      if (r.changed) {
        changedCount++;
        console.log(
          `✓ ${file}: ${formatKB(r.before)} → ${formatKB(r.after)}${r.resized ? ' (ridimensionata)' : ''}`,
        );
      }
    } catch (err) {
      console.warn(`⚠ Salto "${file}": ${err.message}`);
    }
  }

  console.log('');
  if (changedCount > 0) {
    const savedPct = Math.round(100 * (1 - totalAfter / totalBefore));
    console.log(
      `Ottimizzate ${changedCount}/${files.length} immagini · ${formatKB(totalBefore)} → ${formatKB(totalAfter)} (−${savedPct}%).`,
    );
  } else {
    console.log(`Nessuna immagine da ottimizzare (${files.length} già a posto).`);
  }
}

await main();
