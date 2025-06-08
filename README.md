# Portfolio

![Build Status](https://github.com/felixyangyicheng/felixyangyicheng.github.io/actions/workflows/pages.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

Bienvenue sur le dépôt source de mon portfolio personnel, développé avec **Blazor WebAssembly** et déployé automatiquement via **GitHub Pages**. Le site est conçu comme une **Progressive Web App (PWA)**, intégrant des fonctionnalités modernes telles que le mode hors-ligne, les notifications push, et la synthèse vocale.

---

## 🔧 Technologies utilisées

* **Blazor WebAssembly (.NET 10)**
* **Progressive Web App** (manifest.json, service-worker.js)
* **GitHub Actions** pour CI/CD
* **Données structurées JSON** (contenus dynamiques multilingues)
* **Synthèse vocale via Toolbelt.Blazor.SpeechSynthesis**
* **Notifications push personnalisées**

---

## ✨ Fonctionnalités principales

* 📄 Présentation de projets et expériences personnelles
* 📱 Application installable (PWA)
* 🔈 Synthèse vocale via Blazor
* 🔔 Notifications push personnalisées
* ⚙️ Déploiement continu avec GitHub Actions

---

## 📁 Structure du projet

```
├── index.html               # Page principale
├── manifest.json            # Configuration PWA
├── service-worker.js        # Cache offline PWA
├── pushNotifications.js     # Script notifications push
├── appsettings.json         # Configuration Blazor
├── *.json                   # Données dynamiques multilingues
├── Capybara.styles.css      # Feuille de style principale
└── .github/workflows/       # Workflows GitHub Actions
```


## 🔁 GitHub Actions : Intégration et Déploiement Continu

Ce dépôt utilise un pipeline CI/CD basé sur **GitHub Actions** pour automatiser la génération et le déploiement du site sur **GitHub Pages**. Ce système prend en charge l'intégralité de la chaîne de publication : compilation, optimisation, génération de fichiers statiques, puis publication.

### 📂 Emplacement

Les fichiers de workflows sont situés dans :

```
.github/workflows/
```

### ⚙️ Workflows présents

#### 1. **GitHub Pages Deployment**

* **Nom du fichier** : `.github/workflows/pages.yml`
* **Branches concernées** : `master`
* **Déclencheurs** :

  * `push` sur la branche `master`
  * `workflow_dispatch` (lancement manuel)
* **But** : Compiler le site statique (Blazor WebAssembly ou autre générateur) et le publier automatiquement sur GitHub Pages.

#### 🔧 Étapes principales du workflow

1. **Checkout du code source**

   ```yaml
   uses: actions/checkout@v4
   ```

2. **Configuration de GitHub Pages**

   ```yaml
   uses: actions/configure-pages@v5
   ```

3. **Construction du site** (ex. Blazor ou Jekyll)

   ```yaml
   uses: actions/jekyll-build-pages@v1
   ```

4. **Upload de l’artefact**

   ```yaml
   uses: actions/upload-pages-artifact@v3
   ```

5. **Déploiement final sur GitHub Pages**

   ```yaml
   uses: actions/deploy-pages@v4
   ```

### 🧪 Scripts personnalisés

Le projet utilise également un script PowerShell pour générer dynamiquement le menu de navigation :

```bash
./nav-gene.ps1
```

Ce script est exécuté automatiquement durant la phase de build.

### 📦 Actions GitHub externes utilisées

| Action                          | Rôle                          | Version |
| ------------------------------- | ----------------------------- | ------- |
| `actions/checkout`              | Récupère le code source       | `v4`    |
| `actions/configure-pages`       | Prépare l’environnement Pages | `v5`    |
| `actions/jekyll-build-pages`    | Compile le site (si Jekyll)   | `v1`    |
| `actions/upload-pages-artifact` | Archive le site compilé       | `v3`    |
| `actions/deploy-pages`          | Déploie sur GitHub Pages      | `v4`    |

---

### 🧠 Synthèse CI/CD

L’architecture CI/CD repose sur un workflow unique, automatisant la publication du site via Pages. Chaque push sur `master` déclenche :

* une compilation locale,
* la génération du contenu statique,
* le déploiement automatique sur GitHub Pages,
* sans intervention manuelle nécessaire.

Cela garantit un cycle de développement fluide, professionnel et didactique.

---

## 📜 Licence

Ce projet est sous licence **MIT**.
Voir le fichier [`LICENSE`](LICENSE) pour plus d'informations.

---

## 👤 À propos de l’auteur

**Yicheng Yang**
passionné par l’intelligence artificielle, la programmation et le design logiciel. ce site présente ses réalisations, projets et expérimentations.

Retrouvez-moi sur :

* 🌐 [Mon site](https://felixyangyicheng.github.io)

---

> *“Un jour, nos routes se croiseront, c'est de la programmation orienté d'Oseille”* – Fameux IT Man Yish.
Dernière modification: 2025-06-08T01:39:PMZ
