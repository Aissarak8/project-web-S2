# 📚 BiblioHub — Bibliothèque Universitaire Moderne

> Site web complet d'une bibliothèque universitaire — Projet Front-End S2

[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue?style=flat-square&logo=github)](https://aissarak8.github.io/project-web-S2/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/fr/docs/Web/JavaScript)

---

## 🌐 Démo en ligne

**👉 [aissarak8.github.io/project-web-S2](https://aissarak8.github.io/project-web-S2/)**

---

## 📖 À propos du projet

**BiblioHub** est un site web front-end complet simulant une bibliothèque universitaire moderne. Développé dans le cadre du module de **Développement Web Front-End (S2)**, il propose une interface élégante, responsive et interactive permettant de :

- Parcourir et filtrer un catalogue de 15 000+ ouvrages
- Réserver une table dans différentes zones de la bibliothèque
- Consulter les services disponibles et les horaires
- Découvrir les événements culturels à venir
- Contacter l'équipe via un formulaire validé

---

## 🗂️ Structure du projet

```
project-web-S2/
│
├── index.html          # Page d'accueil (hero, stats, slider, nouvelles acquisitions)
├── catalogue.html      # Catalogue avec recherche et filtres par catégorie
├── services.html       # Services + tableau des horaires d'ouverture
├── reservation.html    # Réservation de tables (zones A / B / C)
├── evenements.html     # Agenda des événements culturels
├── contact.html        # Formulaire de contact + FAQ accordéon
│
├── css/
│   └── style.css       # Feuille de style unique (~900 lignes, Flexbox + Grid)
│
├── js/
│   └── main.js         # Script JavaScript unique (~300 lignes, vanilla JS)
│
└── images/
    ├── *.jpg / *.jfif  # Couvertures de livres (générées par IA)
    └── service/        # Images illustratives pour les services
```

---

## ✨ Fonctionnalités

### 🏠 Accueil
- Section **Hero** avec CTA et animation flottante
- **Compteurs animés** (count-up déclenché par IntersectionObserver)
- **Slider** de livres à la une — autoplay, prev/next, dots, swipe tactile, clavier

### 📚 Catalogue
- **Recherche en temps réel** par titre ou auteur
- **Filtres par catégorie** : Tous · Littérature · Sciences · Informatique · Histoire · Philosophie
- 12 fiches livres avec badges de disponibilité (Disponible / Réservé / Emprunté)

### 🪑 Réservation
- Formulaire de réservation de tables (Nom, Prénom, Email, Personnes, Zone, Date, Heure)
- Validation email universitaire (`@uca.ac.ma` uniquement)
- Présentation des **zones A / B / C** avec descriptions

### 📬 Contact
- Formulaire validé (validation en temps réel au blur + à la soumission)
- **FAQ accordéon** HTML natif (`<details>/<summary>`)

### 🔧 Éléments partagés
- **Navbar responsive** avec menu hamburger (mobile)
- **Bouton scroll-to-top** (apparaît après 400px)
- **Lien actif** dans la navbar selon la page courante
- **Footer** complet avec liens rapides, services et informations de contact

---

## 🛠️ Technologies utilisées

| Technologie | Usage |
|---|---|
| **HTML5** | Structure sémantique (`<nav>`, `<section>`, `<article>`, `<footer>`) + attributs ARIA |
| **CSS3 Flexbox** | Navbar, hero, cartes, footer, alignements 1D |
| **CSS3 Grid** | Grilles catalogue, services, événements, footer (2D) |
| **JavaScript ES6+** | Interactivité — slider, filtres, validation, animations |
| **Google Fonts** | Playfair Display (titres) + Lato (corps) |

### Outils
- **VS Code** — éditeur principal
- **Git / GitHub** — versioning et collaboration
- **GitHub Pages** — déploiement continu
- **IA générative** — génération des images de couvertures

---

## 🚀 Lancer le projet en local

```bash
# 1. Cloner le dépôt
git clone https://github.com/Aissarak8/project-web-S2.git

# 2. Ouvrir le dossier
cd project-web-S2

# 3. Ouvrir index.html dans votre navigateur
# (double-clic sur index.html, ou via Live Server sur VS Code)
```

> ⚠️ Aucune dépendance, aucun npm install — c'est du HTML/CSS/JS pur !

---

## 👩‍💻 Équipe

| Rôle | Contribution |
|---|---|
| **Aissarak8** | Architecture globale · Structure HTML · CSS complet · GitHub Pages |
| **Collègue** | Contenu éditorial · JavaScript interactif · Responsive · Tests |

---

## 📄 Licence

Projet académique — Module Développement Web Front-End S2 · 2024–2025  
Faculté des Sciences Semlalia — Université Cadi Ayyad, Marrakech 🇲🇦
