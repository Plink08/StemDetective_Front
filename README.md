# StemDetective Website

De StemDetective website is een interactieve webapplicatie waarmee gebruikers eenvoudig kunnen zien in hoeverre het stemgedrag van politieke partijen overeenkomt met hun verkiezingsprogramma’s.

De website communiceert met een externe API en visualiseert de resultaten op een duidelijke en toegankelijke manier.

---

## Features

* Selecteer een politieke partij en start direct een analyse
* Visuele weergave van resultaten met een interactieve grafiek
* Percentage overeenstemming tussen stemgedrag en programma
* Uitklapbare onderwerpen met:

  * Standpunten
  * Oplossingen
* Mobiel responsive design
* Loader tijdens analyse (kan enkele seconden duren)
* FAQ pagina met uitleg

---

## Technologieën

* HTML
* CSS (responsive design)
* JavaScript
* Chart.js (voor grafieken)

---

## Structuur

```contents
Contents/
├── index.html     # Hoofdpagina
├── script.js      # Logica en API calls
├── style.css      # Styling
├── faq.html       # FAQ pagina
├── faq.js         # FAQ interactie
├── sw.js          # Serviceworker voor mobiel
├── manifest.json  # Manifest
└── fotos/         # Afbeeldingen
```

---

## Gebruik

1. Open de website in je browser
2. Kies een partij in de dropdown
3. Klik op **Start Analyse**
4. Wacht tot de analyse is geladen
5. Bekijk:

   * Grafiek met resultaten
   * Conclusie
   * Details per onderwerp

---

## API koppeling

De website haalt data op via een externe API:

```fetch
GET /analyse/{party}
```

Voorbeeld:

```endpoint
/analyse/vvd
```

De response wordt gebruikt om:

* grafieken te genereren
* percentages te berekenen
* onderwerpen te tonen

---

## Responsive Design

De website is geoptimaliseerd voor:

* Desktop
* Tablet
* Mobiel

Layout past zich automatisch aan met flexbox en media queries.

---

## Loader

Tijdens het ophalen van data wordt een loader weergegeven:

* voorkomt dat gebruikers denken dat de site vastloopt
* geeft feedback bij langzame analyses

---

## Belangrijke Opmerking

* De snelheid van de analyse hangt af van de backend
* Eerste analyse kan langer duren
* Bij herhaald gebruik wordt de ervaring sneller

---

## Toekomstige verbeteringen

* Betere mobiele UX
* Animaties en micro-interacties
* Meer visualisaties
* Opslaan van eerdere analyses
* Progressive Web App (offline ondersteuning)

---

## Auteur

Gemaakt door:

Lenn van der Meer & Joss Voogt
