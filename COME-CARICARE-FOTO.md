# Come caricare le foto sul sito

Guida semplice per aggiungere o cambiare le foto del sito Dart Production.
**Non serve essere esperti di computer** e **non serve nessun programma**: si fa
tutto dal pannello del sito, in pochi clic.

> ✅ **Buona notizia:** non devi più preoccuparti del peso delle foto.
> Carica pure la foto così com'è (anche quella grande appena scattata): il sito
> la **ottimizza da solo** dopo il caricamento, riducendone il peso senza
> rovinarne la qualità. Tu carichi, al resto pensa il sito.

---

## 1. Aggiungere o cambiare una foto

1. Vai sul pannello di gestione del sito:
   **`https://dart-production.vercel.app/admin/`**
   (è l'indirizzo del sito con `/admin/` alla fine).

2. **Accedi** cliccando su **«Login with GitHub»** e usa l'account che ti è
   stato fornito.

3. Scegli la sezione da modificare nel menù a sinistra:
   - **Pagine del sito** → Homepage, Studio, Servizi, Contatti
   - **Progetti** → Stampa, Allestimento, Personalizzazione, Eventi

4. Apri la pagina o il progetto, poi trova il campo **«Immagine»**.

5. Clicca sul campo immagine: si apre la finestra **Media** (la libreria foto).

6. Clicca **«Upload»** (in alto a destra) e seleziona la foto dal tuo
   computer o telefono.

7. Quando la foto compare nella libreria, cliccala per selezionarla e premi
   **«Choose selected»** (in alto a destra).

8. In alto a destra premi **«Publish»** → **«Publish now»** per salvare.

9. **Aspetta 1–2 minuti.** Il sito si aggiorna da solo e nel frattempo
   ottimizza la foto. Poi ricarica la pagina del sito per vederla.

> 💡 Se la foto non compare subito, è normale: il sito impiega un paio di minuti
> ad aggiornarsi. Ricarica la pagina con **Ctrl + F5** (su Mac **Cmd + Shift + R**).

---

## 2. ❌ Non usare i link di Google Drive (o Dropbox, ecc.)

È la causa più comune del problema "la foto non si vede".

Il link di condivisione di Google Drive (quello tipo
`https://drive.google.com/file/d/.../view?usp=sharing`) **non è il link della
foto**: è il link della *pagina di Google Drive* che mostra la foto. Il sito non
riesce a usarlo come immagine, quindi vedi un'immagine rotta.

👉 **Usa sempre il pulsante «Upload»** e carica il file dal dispositivo.
Non incollare link esterni nel campo immagine.

(E no, il link **non** rende il sito più veloce: la foto viene comunque
scaricata da chi visita il sito. La velocità la garantisce già l'ottimizzazione
automatica descritta sopra.)

---

## 3. Le foto si ottimizzano da sole

Dopo ogni caricamento, il sito:

- **rimpicciolisce** le foto troppo grandi (fino a un massimo di 2400 px di lato,
  più che sufficiente per qualsiasi schermo);
- le **comprime** per farle pesare molto meno, mantenendo una bella qualità;
- **non cambia** né il nome né il formato del file.

Risultato: foto che pesavano 8–12 MB scendono a poche centinaia di KB
(circa il **90% in meno**), e il sito diventa molto più veloce.

Non devi fare nulla: succede in automatico nei minuti successivi al caricamento.

---

## 4. Consigli rapidi

- **Formati accettati:** `JPG`, `PNG`, `WEBP`.
- **Carica l'originale:** non serve ridurre la foto prima, ci pensa il sito.
- **Evita gli screenshot di foto** (es. foto fotografate dallo schermo o salvate
  da WhatsApp): perdono qualità. Usa il file originale quando puoi.
- **Foto orizzontali** per le immagini grandi/di copertina, **verticali** o
  quadrate per le gallery: vengono più belle.

---

## 5. Problemi frequenti

**La foto non si vede dopo il salvataggio.**
Aspetta 1–2 minuti (il sito si sta aggiornando) e ricarica con Ctrl + F5.
Se hai incollato un link invece di caricare il file, rifai il passaggio 6 con
**«Upload»**.

**Ho caricato la foto ma è ruotata.**
Capita con alcune foto da telefono. Ricaricala: il sito raddrizza
automaticamente l'orientamento durante l'ottimizzazione.

**Posso eliminare una foto vecchia?**
Sì, dalla finestra **Media**, ma assicurati che non sia usata in altre pagine.

---

Per qualsiasi dubbio, scrivi a chi gestisce il sito. 🙂
