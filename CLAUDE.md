# Dart Production — Sito Web

## Panoramica
Sito web per Dart Production, studio creativo e laboratorio di produzione specializzato in stampa, ricamo e prodotti personalizzati. È un sito **statico in Astro**, con contenuti modificabili da un **CMS (Decap CMS)** e pubblicato su **Vercel**.

## Lingua
- Comunicare sempre in italiano con l'utente
- L'utente non ha esperienza di programmazione: spiegare ogni passaggio tecnico in modo semplice
- I testi del sito sono in italiano (con termini inglesi dove appropriato per il brand)

## Tech Stack
- **Astro 5** (`output: 'static'`) — generatore di sito statico
- **@astrojs/vercel** — adapter per il deploy su Vercel
- **Decap CMS 3** (ex Netlify CMS) — pannello di gestione contenuti su `/admin/`, backend **GitHub** (commit diretti sul branch `main`)
- **sharp** (devDependency) — ottimizzazione automatica delle immagini
- Nessun framework UI: HTML/CSS custom + un po' di JavaScript vanilla (animazioni allo scroll, menu mobile)

## Come funziona (in breve)
1. I **testi** delle pagine stanno in file Markdown dentro `content/` (formato `yaml-frontmatter`).
2. Le **pagine** sono file `.astro` in `src/pages/` che leggono quei testi e li mostrano.
3. Il **cliente** modifica testi e foto dal CMS su `https://dart-production.vercel.app/admin/` (login con GitHub). Ogni modifica diventa un commit su `main`.
4. A ogni push su `main`, una **GitHub Action** (`.github/workflows/deploy.yml`) chiama il deploy hook di Vercel → il sito viene ricostruito e pubblicato.
5. Le **foto** caricate finiscono in `public/uploads/` e vengono **ottimizzate in automatico** (vedi sotto).

## Struttura Progetto
```
src/
  layouts/Layout.astro      Header (nav), footer, menu mobile, animazioni scroll
  pages/                    Pagine .astro
    index.astro             Homepage
    studio.astro            Studio
    servizi.astro           Servizi
    progetti.astro          Progetti (panoramica)
    contatti.astro          Contatti
    progetti/               Pagine per categoria (stampa, allestimento, personalizzazione, eventi)
    api/                    auth.ts + callback.ts (OAuth GitHub per il login al CMS)
  styles/global.css         TUTTO il CSS (variabili, tipografia, sezioni, responsive)
content/                    Testi delle pagine in Markdown (yaml-frontmatter)
public/
  admin/                    Decap CMS: index.html + config.yml
  uploads/                  Foto del sito (ottimizzate in automatico)
scripts/optimize-images.mjs Script di ottimizzazione immagini
.github/workflows/
  deploy.yml                Triggera il deploy su Vercel a ogni push su main
  optimize-images.yml       Ottimizza le foto caricate a ogni push su main
COME-CARICARE-FOTO.md       Guida non tecnica per i clienti (caricare le foto)
```
> Nota: le cartelle `templates/`, `css/`, `copy/`, `assets/`, `docs/`, `js/`, `preview/`, `sito-v2/` sono in `.gitignore` (residui di una vecchia impostazione WordPress/Elementor poi abbandonata). **Non fanno parte del sito attuale.**

## Design System

### Palette colori (variabili in `src/styles/global.css`)
- Primario: `#3BCEAC` (teal/menta) — `--primary`
- Primario chiaro: `#5EDDC0` — `--primary-light`
- Primario scuro: `#2AA88C` — `--primary-dark`
- Nero: `#0A0A0A` — `--black`
- Scuri: `#111111` (`--dark`), `#1A1A1A` (`--dark-2`)
- Grigi: `#333` (`--gray-dark`), `#888` (`--gray`), `#aaa` (`--gray-light`)
- Chiari: `#F5F5F5` (`--light`), `#EBEBEB` (`--light-2`)
- Bianco: `#FFFFFF` — `--white`

### Font
- **Inter** (pesi 300–900), caricato da Google Fonts in `Layout.astro`
- Fallback: `-apple-system, BlinkMacSystemFont, sans-serif`

### Stile
- Minimal, pulito, visivo; immagini grandi e d'impatto
- Animazioni leggere: fade-in/slide allo scroll tramite classe `.reveal` → `.visible` (IntersectionObserver in `Layout.astro`)
- Mobile-first responsive; menu a comparsa (hamburger) su mobile

## Pagine del Sito
1. **Homepage** (`/`) — hero, marquee, chi siamo, servizi, progetti in evidenza, metodo, clienti, partner Stanley/Stella, CTA
2. **Studio** (`/studio`) — hero, storia, team, laboratorio, showroom, valori
3. **Servizi** (`/servizi`) — hero, lista servizi, CTA
4. **Progetti** (`/progetti`) — hero + 4 sezioni categoria, CTA
5. **Progetti per categoria** (`/progetti/stampa`, `/allestimento`, `/personalizzazione`, `/eventi`) — lista progetti con gallery e dettaglio in modale
6. **Contatti** (`/contatti`) — info (email, telefono, dati aziendali) + pulsanti **Email** e **WhatsApp** (nessun form server-side)

Categorie progetti: **Stampa, Allestimento, Personalizzazione, Eventi**.

## Gestione contenuti (Decap CMS)
- Pannello: `https://dart-production.vercel.app/admin/` — configurazione in `public/admin/config.yml`
- Collezioni: **Pagine del sito** (Homepage, Studio, Servizi, Contatti) e **Progetti** (panoramica + 4 categorie)
- I campi immagine usano il widget `image`: il valore salvato è un percorso tipo `/uploads/foto.jpg`
- ⚠️ **Niente link esterni nei campi immagine** (es. link di condivisione Google Drive): non sono link diretti a un file immagine e non vengono mostrati. Usare sempre il caricamento (Upload).

## Immagini e ottimizzazione automatica
- Le foto stanno in `public/uploads/` e vengono mostrate con `<img src="/uploads/...">`
- A ogni caricamento, `.github/workflows/optimize-images.yml` esegue `scripts/optimize-images.mjs`:
  - ridimensiona a max **2400px** sul lato lungo e ricomprime (qualità ~82)
  - **mantiene nome e formato** del file (così i collegamenti non si rompono)
  - è **idempotente**: se una foto è già ottimizzata non viene toccata (niente loop)
  - dopo il commit (fatto col token di Actions) triggera il deploy su Vercel
- Per lanciarlo a mano in locale: `npm run optimize:images` (richiede `npm install`)

## Comandi
- `npm run dev` — sviluppo locale
- `npm run build` — build di produzione
- `npm run preview` — anteprima della build
- `npm run optimize:images` — ottimizza le foto in `public/uploads`

## Regole di Lavoro
- Modifiche al layout/stile: in `src/` e `src/styles/global.css` (un unico file CSS, organizzato per sezioni)
- Modifiche ai testi: in `content/*.md` (o dal CMS)
- Usare le **variabili CSS** della palette, non colori scritti a mano
- Ogni pagina deve funzionare su mobile senza interventi manuali
- I placeholder per le foto mancanti si indicano con il campo `imagePlaceholder` nei contenuti
- Scrivere guide passo-passo (in italiano, semplici) per ogni operazione che il cliente deve fare

## Deploy
- Hosting: **Vercel** — `https://dart-production.vercel.app`
- Trigger: push su `main` → `deploy.yml` chiama il deploy hook (segreto `VERCEL_DEPLOY_HOOK_URL`)
- Il branch di sviluppo corrente è separato da `main`; le modifiche vanno online solo dopo l'unione su `main`
