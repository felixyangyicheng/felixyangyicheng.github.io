
# 🚀 Guide pour exécuter Ollama sur Ubuntu 24.04 avec une AMD Radeon RX 6500 XT (Méthode Non Officielle) 🇫🇷

*Ce guide explique comment configurer Ollama pour utiliser une carte graphique AMD RX 6500 XT sous Ubuntu 24.04.*  
**⚠️ Attention :** Cette méthode implique des manipulations avancées et n'est pas officiellement supportée !

---

## 📋 Prérequis
- Ubuntu 24.04 installé
- AMD Radeon RX 6500 XT (ou compatible avec ROCm)
- Accès administrateur (`sudo`)
- Connexion internet stable

---

## 🛠️ Configuration du système
---

### 1. Mettre à jour les dépôts et installer le paquet AMDGPU
```bash
sudo apt update
wget https://repo.radeon.com/amdgpu-install/6.1.3/ubuntu/focal/amdgpu-install_6.1.60103-1_all.deb
sudo apt install ./amdgpu-install_6.1.60103-1_all.deb
```

### 2. Installer ROCm et les bibliothèques HIP
```bash
sudo amdgpu-install --no-dkms --usecase=hiplibsdk,rocm
sudo rocminfo  # Vérifier la détection du GPU
sudo reboot
```

---

## 🔧 Configuration d'Ollama

### 1. Installer Ollama
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### 2. Modifier le fichier de service Ollama
```bash
sudo nano /etc/systemd/system/ollama.service
```

**Ajouter ces lignes sous la section `[Service]`**:
```ini
Environment="HSA_OVERRIDE_GFX_VERSION=10.3.0"
Environment="ROCR_VISIBLE_DEVICES=0"
```

### 3. Recharger le service
```bash
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

---

## 🧪 Tester l'installation

### 1. Exécuter un modèle (ex: Llama3.1)
```bash
ollama run llama3.2:3b-instruct-q8_0
```

### 2. Surveiller l'utilisation du GPU
```bash
watch -n 1 rocm-smi
```

---

## 🚨 Dépannage
- **Erreur "GPU non supporté"** : Vérifiez les variables d'environnement dans `ollama.service`.
- **Problèmes ROCm** : Exécutez `rocminfo` pour confirmer la détection du GPU.
- **Réinstallation** : Si nécessaire, désinstallez avec `amdgpu-install --uninstall`.

---

## 🔗 Références
- [TMV Tech: Ollama avec AMD GPUs](https://www.tmvtech.com/ubuntu-tutorial-ollama-with-amd-gpus/)
- [Major.io: Radeon 6600XT & Ollama](https://major.io/p/ollama-with-amd-radeon-6600xt/)
- [Conroyp's Performance Guide](https://www.conroyp.com/articles/running-ollama-ubuntu-unsupported-amd-gpu-performance-guide/)
- [GitHub: ollama-for-amd](https://github.com/likelovewant/ollama-for-amd/)
- [Troubleshooting Guide](https://github.com/likelovewant/ollama-for-amd/wiki#troubleshooting-amd-gpu-support-in-linux/)
- [Furaar's Gist](https://gist.github.com/furaar/ee05a5ef673302a8e653863b6eaedc90)

---

**✨ Bonne expérience avec l'IA locale !**  
*Si ce guide vous a aidé, pensez à donner une ⭐ sur les dépôts GitHub mentionnés !*
``` 

## Fonctionnalités clés :
- **Emojis thématiques** pour une lecture visuelle
- **Code en surbrillance** pour les commandes critiques
- **Structure modulaire** avec sections clairement séparées
- **Notes de dépannage** proactives
- **Compatibilité RX 6500 XT** via le override GFX 10.3.0
- **Commandes de monitoring** en temps réel

**⚠️ Remarque :** Les performances peuvent varier selon les modèles et les drivers ROCm.