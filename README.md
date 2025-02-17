# Movie Search App

[Live Demo](https://elisei-m.github.io/movie-search-app/)

![image](https://github.com/user-attachments/assets/8e69aded-f0e0-4ede-b2e5-6e5bac7234a5)


## Descriere

Movie Search App este o aplicație web client-side care permite căutarea și vizualizarea filmelor folosind OMDb API. Proiectul include funcționalități precum:
- Căutarea filmelor după titlu
- Filtrarea rezultatelor după tip (movie, series, episode)
- Sortarea filmelor după anul lansării (ascendent/descendent)
- Paginare (Load More)
- Vizualizarea detaliilor complete ale unui film printr-o fereastră modală
- Adăugarea/eliminarea filmelor din favorite (salvate în `localStorage`)
- Comutarea între modurile Dark/Light
- Un footer personalizat care evidențiază autorul

## Funcționalități

- **Căutare și filtrare:** 
  - Introdu un titlu de film și selectează opțiunile dorite pentru filtrare și sortare.
- **Paginare:** 
  - Apasă butonul „Load More” pentru a încărca rezultate suplimentare.
- **Detalii film:** 
  - Click pe butonul „Details” pentru a vedea informații detaliate despre film într-un modal.
- **Favorite:** 
  - Adaugă sau elimină filme din lista de favorite.
- **Dark/Light Mode:** 
  - Comută între modul dark și cel light cu butonul de temă fix în colțul din dreapta sus.
- **Footer personalizat:** 
  - Footer-ul indică că site-ul a fost creat de tine, cu link către profilul tău GitHub.

## Tehnologii folosite

- **HTML5** – Structura paginii
- **CSS3** – Stilizarea interfeței, inclusiv un design responsive și teme (Dark/Light Mode)
- **JavaScript** – Funcționalitatea aplicației și interacțiunea cu OMDb API
- **OMDb API** – Pentru obținerea datelor despre filme

## Cum se folosește

1. **Obținerea unui API Key:**
   - Mergi la [OMDb API](http://www.omdbapi.com/apikey.aspx) și solicită un API key (folosește cel primit în email, de ex. `5f369cac`).
   - Înlocuiește cheia din fișierul `script.js` dacă este necesar.

2. **Căutarea filmelor:**
   - Introdu un titlu în câmpul de căutare și apasă „Search” sau tastează Enter.
   - Selectează opțiunile din dropdown pentru a filtra după tip și sortare după an.
   - Apasă „Load More” pentru a încărca mai multe rezultate, dacă sunt disponibile.

3. **Vizualizarea detaliilor:**
   - Apasă butonul „Details” de pe un film pentru a vedea informațiile detaliate într-o fereastră modală.

4. **Gestionarea filmelor favorite:**
   - Apasă butonul „Favorite” pentru a adăuga sau elimina filmele din lista ta de favorite.
   - Poți vizualiza favoritele prin butonul „View Favorites”.

5. **Comutarea între Dark/Light Mode:**
   - Click pe butonul de temă (aflat fix în colțul din dreapta sus) pentru a comuta între modul Dark și Light.

## Instalare și rulare locală

1. Clonează repository-ul:
   ```bash
   git clone https://github.com/elisei-m/movie-search-app.git

Navighează în directorul proiectului:
cd movie-search-app

Deschide fișierul index.html în browserul tău (poți folosi și o extensie precum Live Server în VS Code).
Contribuții
Contribuțiile sunt binevenite! Dacă dorești să îmbunătățești proiectul:

Fork-uiți repository-ul.
Creați o ramură nouă (ex: feature/noua-functie).
Trimiteți un Pull Request cu modificările voastre.
Licență
Acest proiect este licențiat sub MIT License.

Autor
Created by Elisei M.
GitHub Profile


---

Acest `README.md` oferă o prezentare clară a aplicației, explică funcționalitățile, tehnologiile folosite, modul de instalare și rulare, precum și informații despre contribuții și licență. Dacă dorești să adaugi sau să ajustezi ceva, îmi poți spune!

