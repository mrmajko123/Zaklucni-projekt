# Zaklucni-projekt – KioskApp

Kiosk aplikacija za **tablico (Android)** in **Windows (PC)**. Projekt temelji na treh glavnih mapah:

| Mapa     | Platforma  | Tehnologija             |
|----------|------------|-------------------------|
| `android/` | Tablica  | Android (Kotlin + Gradle) |
| `electron/` | Windows | Electron (Node.js + HTML/CSS/JS) |
| `src/`   | Skupno    | Deljena koda in tipi    |

---

## 1. Android (Tablica)

Lokacija: `android/`

### Struktura

```
android/
├── build-apk.bat            # APK installer build script (signiranje + zgradba)
├── build.gradle             # Projekt-nivječna Gradle konfiguracija
├── settings.gradle          # Vključuje :app modul
├── gradle.properties        # Gradle nastavitve (AndroidX, JVM args)
├── app/
│   ├── build.gradle         # App-nivječna konfiguracija (signing config)
│   ├── keystore.properties   # Signing credentials (ni v gitu!)
│   ├── .gitignore          # Preclude keystore.properties
│   ├── proguard-rules.pro
│   └── src/main/
│       ├── AndroidManifest.xml
│       ├── java/com/example/kiosk/MainActivity.kt
│       ├── res/
│       │   ├── layout/activity_main.xml
│       │   ├── values/strings.xml
│       │   ├── values/themes.xml
│       │   └── drawable/ic_launcher.xml
│       └── AndroidManifest.xml
```

### Glavne značilnosti

- **Kiosk način** – celozaslonska politika z `WindowInsetsController`, dostižna stanje vrstic in navigacija.
- **Landscape orientacija** – aplikacija deluje v ležačem položaju.
- **Imerzivni način** – `BEHAVIOR_SHOW_TRANSIENT_BARS_FROM_TOUCH`.

### Debug zgradba (hitro testiranje)

1. Namesti [Android Studio](https://developer.android.com/studio) ali [Android SDK](https://developer.android.com/studio#command-tools-only).
2. V terminalu v mapi `android/` zaženi:

   ```bash
   ./gradlew assembleDebug      # Različica za debug
   ```

3. Debug APK najdemo v `app/build/outputs/apk/debug/`.

### APK installer (release z signiranjem)

1. Ustvari `app/keystore.properties` datoteko (predloga na voljo po prvem zagonu):

   ```properties
   storeFile=kiosk-release.keystore
   storePassword=your_store_password
   keyAlias=kiosk-key
   keyPassword=your_key_password
   ```

2. Zaženi build script – samodejno generira keystore in podpiše APK:

   ```bash
   android\build-apk.bat
   ```

3. Signed release APK najdemo v `app/build/outputs/apk/release/`.

   Ročno brez skripti:

   ```bash
   ./gradlew assembleRelease -PstoreFile=kiosk-release.keystore -PstorePassword=*** -PkeyAlias=kiosk-key -PkeyPassword=***
   ```

---

## 2. Electron (Windows PC)

Lokacija: `electron/`

### Struktura

```
electron/
├── build.bat                   # Build wizard script
├── package.json                # Dependencies + scripts
├── main.js                     # Electron glavni proces (kiosk način)
├── preload.js                  # Vzdorčni most (contextBridge)
├── index.html                  # Glavna stran
├── styles.css                  # Slogi strani
├── renderer.js                 # Renderer logika
├── LICENSE.txt                 # Licenčna sporčila za namestnik
├── electron-builder.config.js  # Konfiguracija za .exe namestnik (NSIS)
└── build/
    ├── installer.nsh           # NSIS prilagojitev (custom wizard strani)
    └── icon.ico                # Ikona aplikacije (dodaj svojko)
```

### Glavne značilnosti

- **Kiosk način** – `kiosk: true` v `BrowserWindow`, celozaslonska okna brez ohranitve menij.
- **Always on top** – okno ostaja v ospredju.
- **Context isolation** – `contextIsolation: true`, `nodeIntegration: false` – varnostno ločilo.
- **Globalna bližina** – `Ctrl+Shift+K` za prikaz/skrivanje okna.

### Zagon v razvoju

1. Namesti [Node.js](https://nodejs.org/).
2. V mapi `electron/` zaženi:

   ```bash
   npm install
   npm start
   ```

### Setup wizard (Windows namestnik)

1. Nadomestni `build/icon.ico` z lastno ikono.
2. V mapi `electron/` zaženi build script:

   ```bash
   electron\build.bat
   ```

   Ili ročno:

   ```bash
   npm install
   npm run build
   ```

3. Namestnik se ustvari v `dist/setup-kiosk-app-1.0.0.exe`.

#### Wizard strani (NSIS)

Namestnik vključuje naslednje strani:

| Stran | Opis |
|-------|-----|
| **Welcome** | Pozdravljenje s pojasnitvijo aplikacije |
| **License** | Licenčna sporčila (LICENSE.txt) |
| **Directory** | Izbira namestitvenega imenika |
| **Components** | Izbiro komponent (desktop shortcut, start menu) |
| **Ready** | Povzetek pred nameščanjem |
| **Install** | Postopek nameščanja |
| **Finish** | Konec z možnostjo zagona aplikacije |

---

## 3. Skupna koda (`src/`)

| Datoteka | Vsebina |
|----------|---------|
| `src/index.ts` | Skupne funkcije in tipi |
| `src/package.json` | Metapaket za deljeno kodo |
| `src/README.md` | Dokumentacija skupne kode |

---

## Prikaz strukture

```
Zaklucni-projekt/
├── android/           # Android kiosk – APK za tablico
├── electron/          # Electron kiosk – .exe + wizard za Windows
├── src/               # Skupna koda (Android + Windows)
├── README.md          # Ta dokumentacija
└── .kilo/             # Kilo konfiguracija (avtomatsko)
```
