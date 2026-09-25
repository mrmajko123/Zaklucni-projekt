# Zaklucni-projekt – Fast Order

Kiosk aplikacija za **tablico (Android)** in **Windows (PC)**. Projekt temelji na treh glavnih mapah:

| Mapa     | Platforma  | Tehnologija             |
|----------|------------|-------------------------|
| `android/` | Tablica  | Android (Kotlin + WebView) |
| `electron/` | Windows | Electron (HTML/CSS/JS) |
| `src/`   | Skupno    | Deljena koda in tipi    |

---

## 1. Android (Tablica)

Lokacija: `android/`

### APK installer (release z signiranjem)

1. Ustvari `app/keystore.properties` (predloga je že na voljo)
2. Zaženi:

   ```bash
   android\build-apk.bat
   ```

3. Signed APK: `app/build/outputs/apk/release/app-release.apk`

---

## 2. Electron (Windows PC)

Lokacija: `electron/`

### Zagon v razvoju

```bash
cd electron
npm install
npm start
```

### Setup wizard (Windows namestnik)

```bash
cd electron
npm run build
```

Namestnik: `dist/Fast Order Setup 1.0.0.exe`

---

## Aplikacija

- **Drinks stran** – pijače s filtrom "drinks"
- **Foods stran** – hrana s filtrom "foods"
- **Combos stran** – kombinacije s filtrom "combos"
- **Košarica** – dodajanje/odstranjevanje izdelkov, naročilo

---

## Prikaz strukture

```
Zaklucni-projekt/
├── android/           # Android – WebView + APK za tablico
├── electron/          # Electron – .exe + wizard za Windows
├── src/               # Skupna koda (Android + Windows)
├── README.md          # Ta dokumentacija
└── .kilo/             # Kilo konfiguracija
```
