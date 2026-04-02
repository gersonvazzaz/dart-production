# Dart Production — Sito Web

## Panoramica
Sito web per Dart Production, studio creativo e laboratorio di produzione specializzato in stampa, ricamo e prodotti personalizzati. WordPress + Elementor Free su Hostinger.

## Lingua
- Comunicare sempre in italiano con l'utente
- L'utente non ha esperienza di programmazione: spiegare ogni passaggio tecnico in modo semplice
- I testi del sito sono in italiano (con termini inglesi dove appropriato per il brand)

## Tech Stack
- WordPress (ultima versione stabile)
- Elementor Free (NO widget Pro)
- Plugin gratuiti: Contact Form 7 (form), CPT UI (custom post type Progetti)
- CSS custom per stile avanzato, animazioni, font

## Struttura Progetto
```
/templates/          Template JSON Elementor per ogni pagina
/css/                CSS custom (stile globale, animazioni, responsive)
/copy/               Testi definitivi per ogni pagina
/assets/             Loghi, icone, SVG (NO foto — le aggiunge il cliente)
/docs/               Guide per il cliente (come importare, come aggiungere progetti)
```

## Design System

### Palette colori
- Primario: `#29767B` (teal accent)
- Nero: `#1A1A1A`
- Grigio scuro: `#2D2D2D`
- Grigio medio: `#6B6B6B`
- Grigio chiaro: `#F5F5F5`
- Bianco: `#FFFFFF`

### Font
- Titoli: Inter (Bold/Semibold)
- Corpo: Inter (Regular/Light)
- Fallback: Helvetica, Neue Haas Grotesk, sans-serif

### Stile
- Minimal, pulito, visivo
- Immagini grandi e d'impatto
- Animazioni leggere (fade-in, slide-up al scroll)
- Mobile-first responsive

## Pagine del Sito
1. **Homepage** — Hero + intro + servizi + progetti + metodo + clienti + CTA + footer
2. **Studio** — About + laboratorio + filosofia
3. **Servizi** — Graphics/Design + Print Production + Custom Products
4. **Progetti** — Portfolio grid con filtri (Merchandise, Eventi, Installazioni, Custom)
5. **Contatti** — Info + form (Contact Form 7)
6. **Progetto singolo** — Template: hero, titolo, descrizione, servizi, gallery, cliente

## Limitazioni Elementor Free
- NO Theme Builder: header e footer via tema WP o plugin gratuito
- NO Motion Effects avanzati: usare CSS custom per animazioni
- NO Form widget: usare Contact Form 7
- NO Popup Builder: usare alternative gratuite se necessario
- Widget disponibili: Heading, Text Editor, Image, Button, Spacer, Divider, Icon, Image Box, Icon Box, Container, Columns

## Regole di Lavoro
- Creare template JSON importabili direttamente in Elementor
- Usare SOLO widget disponibili in Elementor Free
- Tutto il CSS custom va in un unico file organizzato per sezioni
- I testi placeholder per le foto vanno indicati chiaramente con [FOTO: descrizione]
- Ogni template deve funzionare su mobile senza interventi manuali
- Scrivere guide passo-passo per ogni operazione che il cliente deve fare

## Workflow
1. Scrivo i testi (copy) per ogni pagina
2. Creo i template JSON Elementor pagina per pagina
3. Scrivo il CSS custom globale
4. Creo la guida di installazione per il cliente
5. L'utente revisiona, io correggo
6. Consegna finale con tutti i file e istruzioni
