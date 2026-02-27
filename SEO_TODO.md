# SEO & Webmaster Setup – To-Do

> Alles was noch erledigt werden muss, sobald `eisfavorite.de` auf GitHub Pages zeigt.

---

## ✅ Bereits erledigt

- [x] Meta Title & Description in `index.html`
- [x] Open Graph Tags (`og:title`, `og:description`, `og:image`, `og:url`)
- [x] Favicon (`favicon.png`) eingebunden
- [x] `sitemap.xml` mit allen Stadt-URLs in `public/`
- [x] `robots.txt` in `public/`
- [x] Google Verifikations-Datei (`googlef51c2813f476b65c.html`) in `public/`
- [x] Google Meta-Tag in `index.html` eingebaut (`f51c2813f476b65c`)
- [x] IndexNow Key-Datei (`eisfavorite-indexnow-key.txt`) in `public/`
- [x] IndexNow Meta-Tag in `index.html` (Key: `a3f8d2e1b5c94701f6e8d3a2b1c5f9e7`)

---

## 🔜 Google Search Console

### Option A: Jetzt schon (mit GitHub Pages URL)
1. Gehe zu [search.google.com/search-console](https://search.google.com/search-console)
2. Klicke **"Property hinzufügen"**
3. Wähle **"URL-Präfix"**
4. Gib ein: `https://mymusicger.github.io/eisfavorit-webseite/`
5. Verifizierungsmethode: **"HTML-Tag"** (Code ist bereits eingebaut)
6. Klicke **"Verifizieren"** → sollte sofort funktionieren
7. Sitemap einreichen: `https://mymusicger.github.io/eisfavorit-webseite/sitemap.xml`

### Option B: Nach Domain-Umzug (eisfavorite.de)
1. Gehe zu [search.google.com/search-console](https://search.google.com/search-console)
2. Klicke **"Property hinzufügen"**
3. Wähle **"URL-Präfix"**
4. Gib ein: `https://eisfavorite.de/`
5. Verifizierungsmethode: **"HTML-Tag"** (Code bereits eingebaut: `f51c2813f476b65c`)
   - Alternativ: **"HTML-Datei"** → `googlef51c2813f476b65c.html` liegt schon im Root
6. Klicke **"Verifizieren"**
7. Sitemap einreichen: `https://eisfavorite.de/sitemap.xml`

---

## 🔜 Bing Webmaster Tools

1. Gehe zu [bing.com/webmasters](https://www.bing.com/webmasters)
2. Klicke **"Site hinzufügen"** → `https://eisfavorite.de/`
3. Verifizierungsmethode: **"XML-Meta-Tag"**
4. Du bekommst einen Code wie: `<meta name="msvalidate.01" content="XXXXXXXX" />`
5. Code an Antigravity schicken → in `index.html` eintragen
6. Dann auf **"Verifizieren"** klicken
7. Sitemap einreichen: `https://eisfavorite.de/sitemap.xml`

> **Tipp:** Wenn Google Search Console bereits verifiziert ist, kannst du bei Bing die Option **"Import from Google Search Console"** nutzen – spart Zeit!

---

## 🔜 IndexNow (Bing)

- Key: `a3f8d2e1b5c94701f6e8d3a2b1c5f9e7`
- Key-Datei erreichbar unter: `https://eisfavorite.de/eisfavorite-indexnow-key.txt`
- Nach Domain-Umzug: Auf [bing.com/indexnow](https://www.bing.com/indexnow) den Key mit der Domain verknüpfen

---

## 📋 Reihenfolge nach Domain-Umzug

1. Domain auf GitHub Pages umleiten (CNAME beim Hoster eintragen)
2. `eisfavorite.de` in GitHub Pages Settings als Custom Domain eintragen
3. Google Search Console → Property `eisfavorite.de` verifizieren + Sitemap einreichen
4. Bing Webmaster → Site hinzufügen (oder via GSC Import)
5. IndexNow Key aktivieren
