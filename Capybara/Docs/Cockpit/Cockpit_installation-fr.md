# 🚀 Installer Cockpit avec Podman sur Ubuntu

 

Suivez ces étapes pour installer Cockpit et le module Podman sur votre système Ubuntu.

 

## 1️⃣ Installer Cockpit

 

```bash

sudo apt update

sudo apt install cockpit

```


## 2️⃣ Installer le module Cockpit-Podman


```bash

sudo apt install cockpit-podman
```


```bash

## 3️⃣ Activer le service Podman
```


```bash

sudo systemctl enable --now podman.socket
```


## 4️⃣ Accéder à Cockpit

Ouvrez votre navigateur et allez à https://localhost:9090.

✅ Résumé

    ✅ Installation de Cockpit
    ✅ Installation du module Podman
    ✅ Activation du service Podman
    ✅ Accès à l'interface Cockpit

Bonne gestion de vos conteneurs avec Cockpit et Podman ! 🎉