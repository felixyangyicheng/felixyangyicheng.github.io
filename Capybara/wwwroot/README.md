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


---

## 📝 Changelog

### 2025-06-18 — v2.0

**⬆️ .NET 11 Preview 5 Upgrade**
- `net10.0` → `net11.0` 目标框架
- 所有 Microsoft 包升级到 `11.0.0-preview.5.26302.115`
- 添加 `global.json` 锁定 SDK
- GitHub Actions workflow 更新为 `11.0.1xx-preview`

**🐛 Bug 修复**
- `CountDownBar`: 计时器间隔 `_secondsToRun*100` 修复为 `1000ms`；`async void` 添加错误处理
- `AboutMe`: CSS 动画名 `backOutDow` → `backOutDown`（最后两个轮播项动画恢复）
- `Counter`: `async void` 定时器添加 try-catch
- `JsTsInterps`: 6 个 JS 互调处理器 `async void` → `async Task`（避免 Blazor 运行时崩溃）
- `FileTransferSender`: 移除死代码 `UploadFiles` + 孤立语句
- `DocComponent`: 移除 600ms `Task.Delay` 竞态 + `new HttpClient()` 泄漏
- `Countries`: 修复初始化竞态条件 + 移除冗余 `base.OnParametersSet()` 调用

**🔧 代码清理**
- `AppComponentBase`: 移除 6 个未使用注入/属性（ToastService, ICookie, IStorage, Changed, IsBusy, ShowBottomMessage）
- `Domino`: `CanBePlacedNextTo()` 实现真正匹配逻辑（原始终返回 true）
- `Global.cs` / `_Imports.razor`: 移除 9 个未使用的全局 using
- `ResultChartDialog`: 移除未使用字段 `_barChart`, `_barCharOptions`
- `CountDownBar`: `EventCallback<Task>` → `EventCallback`
- `QuaternarySelection`: `new Random()` 每次渲染 → `static readonly`
- `MakerService`: 移除冗余 HttpClient 初始化器 + VpicAPI 改为 readonly
- `RoadSecurityTheoryQuestion`: 移除未使用的 `System.Buffers.Text`
- `Piece.razor` / `SingleInput.razor`: 移除子组件上错误的 `@page` 路由
- `FileTransfer/Home.razor`: 删除整个被注释的文件
- `FileTransferSender`: 移除重复的 `@using System.Collections.Concurrent`

**🔒 安全修复**
- `IndividualLetterComboInput`: `eval()` JS 互调 → `window.capybaraFocus` 安全函数

**⚡ 性能优化**
- `Home.razor`: `new HttpClient()` 每渲染泄漏 → `using var` + `ReadToEndAsync`
- `Program.cs`: ApexCharts `Debug=true` → `#if DEBUG` 条件编译
- `index.html`: 移除以 `<script>` 错误加载的 `place_flags.json` 和 `races_chien.json`
- `bootstrap.min.css`: 移除 449KB 生产环境不应存在的 `.map` 引用
- `dog_breeds.json`: 移除未使用的 53KB 文件

**🎨 UI / 无障碍**
- 20 个页面添加 `<PageTitle>` 标签
- `AboutMe`: 轮播图 `alt` 属性改为描述性文本
- `SpeechSynthesis`: 移除无效的 `AutoGrow` 属性
- `UpdateAvailableDetector`: `InvokeAsync<object>` → `InvokeVoidAsync`

**📦 依赖管理**
- 移除未使用包: `BootstrapBlazor.WebAPI`, `JiuLing.CommonLibs`, `Tewr.Blazor.FileReader`, `Microsoft.Extensions.Caching.Memory`, `Microsoft.Extensions.Hosting`
- `ToolBelt.Web.CssClassInlineBuilder` / `CodeBeam.MudBlazor.Extensions` 添加回（实际被使用）

**📝 命名修正**
- `utterancet` → `utterance`（SpeechSynthesisUseCase 中 10 处）

> *"Un jour, nos routes se croiseront, c'est de la programmation orienté d'Oseille"* – Fameux IT Man Yish.
