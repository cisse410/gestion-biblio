# 📚 Gestion de Bibliothèque

> Application web interactive de gestion de catalogue de livres en **JavaScript Vanilla**, HTML5 et CSS3.

[![Licence](https://img.shields.io/badge/licence-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34C26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![XML](https://img.shields.io/badge/XML-0078D4?logo=xml&logoColor=white)](https://www.w3.org/XML/)

---

## 🎯 À propos

Ce projet a été développé dans le cadre du cours **JavaScript Avancé** (Master I SRIV, Université Numérique Cheikh Hamidou Kane). 

L'application permet de gérer un catalogue de livres stocké en **XML** : affichage en tableau (desktop) ou en cartes (mobile), création, modification, suppression et recherche dynamique.

**Sans aucun framework** — juste du JavaScript pur, structuré et sécurisé.

---

## ✨ Fonctionnalités

- ✅ **Chargement XML** – Lecture du catalogue via `XMLHttpRequest`
- ✅ **Affichage** – Tableau interactif avec numéro, couverture, titre, auteur, année, prix
- ✅ **Ajout** – Formulaire modal avec validation HTML5
- ✅ **Modification** – Édition des métadonnées d'un livre existant
- ✅ **Suppression** – Modal de confirmation avant suppression
- ✅ **Recherche** – Filtrage en temps réel par titre
- ✅ **Détails** – Affichage complet d'un livre (couverture + infos)
- ✅ **Responsive** – Optimisé mobile (≤600px), tablette (≤900px), desktop
- ✅ **Notifications** – Toast discrètes après chaque action
- ✅ **Sécurité** – Échappement HTML contre les injections XSS

---

## 🚀 Installation & Utilisation

### Prérequis

- Un navigateur moderne (Chrome, Firefox, Safari, Edge)
- Un serveur HTTP local (**important** : XMLHttpRequest ne fonctionne pas en `file://`)

### Méthode 1 : Live Server (VS Code)

1. Ouvrir le dossier du projet dans **VS Code**
2. Clic droit sur `index.html` → **Open with Live Server**
3. La page s'ouvre automatiquement à `http://127.0.0.1:5500`

### Méthode 2 : Python

```bash
# Python 3.x
cd chemin/vers/gestion-biblio
python -m http.server 8000
```

Accéder à `http://localhost:8000`

### Méthode 3 : Node.js (http-server)

```bash
npm install -g http-server
cd chemin/vers/gestion-biblio
http-server -p 8000
```

Accéder à `http://localhost:8000`

---

## 📁 Structure du Projet

```
gestion-biblio/
├── index.html              # Structure HTML + modals
├── style.css               # Styles (variables CSS, composants, responsive)
├── script.js               # Logique JavaScript (CRUD, XML, DOM)
├── books.xml               # Données du catalogue en XML
├── README.md               # Documentation du projet
├── images/
│   ├── js-avance.png       # Couverture livre 1
│   └── dom.jpg             # Couverture livre 2
```

---

## 💻 Technologie

| Technologie | Usage |
|---|---|
| **HTML5** | Structure sémantique, formulaires natifs, validation |
| **CSS3** | Variables custom, Flexbox, Grid, animations, media queries |
| **JavaScript ES6+** | Manipulation DOM, gestion événements, logique CRUD |
| **XML** | Stockage des données du catalogue |
| **XMLHttpRequest** | Chargement asynchrone du fichier XML |
| **Font Awesome 6** | Iconographie vectorielle (CDN) |

---

## 🎨 Design Patterns

### Architecture

- **État global** – tableau `books[]` stocke le catalogue en mémoire
- **Modularité** – fonctions regroupées par responsabilité (chargement, rendu, CRUD, UI)
- **Événements** – délégation d'événements pour les modals et formulaires
- **Sécurité** – échappement HTML systématique via `escapeHtml()`

### Responsive Design

- **Desktop (>900px)** – Tableau complet avec toutes les colonnes
- **Tablette (≤900px)** – Réduction des paddings, masquage de certaines colonnes
- **Mobile (≤600px)** – Vue carte avec couverture, modals en bottom sheet

---

## 📖 Guide d'Utilisation

### 1. **Afficher les livres**

À l'ouverture, le fichier `books.xml` est chargé automatiquement. Les livres s'affichent dans un tableau (desktop) ou en cartes (mobile).

### 2. **Ajouter un livre**

1. Cliquer sur le bouton **+ Ajouter un livre**
2. Remplir le formulaire (titre et auteur obligatoires)
3. Cliquer sur **Ajouter**
4. Une notification confirme l'ajout

### 3. **Voir les détails**

Cliquer sur le bouton **👁 (eye)** pour afficher une modale avec la couverture et toutes les infos.

### 4. **Modifier un livre**

1. Cliquer sur le bouton **✏️ (pen)**
2. Modifier les champs
3. Cliquer sur **Enregistrer**

### 5. **Supprimer un livre**

1. Cliquer sur le bouton **🗑 (trash)**
2. Confirmer dans la modale
3. Le livre est supprimé

### 6. **Rechercher**

Taper dans le champ de recherche — le tableau se filtre en temps réel par titre.

---

## 🔒 Sécurité

Toutes les données saisies par l'utilisateur ou chargées depuis le XML sont **échappées** avant insertion dans le DOM :

```javascript
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
```

Cela prévient les attaques **XSS** (Cross-Site Scripting).

---

## 📝 Format des Données XML

Le fichier `books.xml` est structuré comme suit :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
  <book>
    <title>Titre du Livre</title>
    <author>Nom de l'auteur</author>
    <year>2020</year>
    <price>5000 FCFA</price>
    <cover>images/couverture.jpg</cover>
  </book>
</bookstore>
```

---

## 🤝 Équipe

### Membres du Groupe

| Nom | Rôle |
|---|---|
| Issakha CISSE | Développement |
| Assiatou DIALLO | Développement |
| Sokhna Astou DIALLO | Développement |
| Pape Saliou FAYE | Développement |
| Anna KA | Développement |
| Issa KEBE | Développement |

### Encadrement

**Tuteur / Encadrant :** M. Mouhamed Moustapha DIOUF

---

## 🏫 Contexte Académique

- **Établissement** : Université Numérique Cheikh Hamidou KANE (UN-CHK)
- **Diplôme** : Master I SRIV (Systèmes, Réseaux et Infrastructures Virtuelles)
- **Module** : JavaScript Avancé
- **Semestre** : 2 (2025–2026)
- **Durée estimée** : 3 semaines

---

## 📋 Cahier des Charges

Voir le fichier [cdc.md](cdc.md) pour les spécifications complètes.

---

## 🎯 Compétences Acquises

- ✔ Manipulation avancée du DOM
- ✔ Gestion des événements
- ✔ CRUD complet en JavaScript
- ✔ Chargement et parsing XML
- ✔ Logique applicative front-end
- ✔ Responsive Design
- ✔ Bonnes pratiques de sécurité

---

## 🔮 Perspectives d'Amélioration

- 💾 **Persistance** – `localStorage` ou `IndexedDB` pour sauvegarder les données
- 🔍 **Recherche avancée** – multi-critères (auteur, année, prix)
- 📊 **Tri** – tri des colonnes du tableau
- 📄 **Pagination** – limiter le nombre de lignes
- 📥 **Export** – générer XML ou CSV
- 🌙 **Dark Mode** – toggle avec variables CSS
- 🔐 **Backend** – API REST pour persistance serveur

---

## 📄 Licence

Ce projet est fourni **à titre éducatif**. Libre d'utilisation et de modification.

---

## 📞 Support

Pour des questions ou problèmes :

1. Vérifier que la connexion XML fonctionne (ouvrir la console → F12)
2. S'assurer d'utiliser un serveur HTTP (pas `file://`)
3. Vérifier le chemin des images dans `books.xml`
4. Consulter la console pour les erreurs JavaScript

---

**Dernière mise à jour** : Mai 2026  
**Version** : 1.0
