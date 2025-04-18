
# Exemple de deploiement automsatisé pour dotnet core avec Docker dans jenkins, à l'aide de bash.

## Prérequis

Connaissance basique des commandes Docker, et Dockerfile, docker-compose.yml



## Exemple:

```bash

#!/bin/bash
# Obtenir version abrégée du tag de l'image

GITHASH=`git rev-parse --short HEAD`
echo ---------------Génération...------------------
echo ---------------Building Docker Image...--------
----------
ls
cd Project.srv
git pull
docker stop project_server
docker rm project_server
docker build -t project_server_srv:$GITHASH .
docker tag project_server_srv:$GITHASH project_server_srv:latest
docker images;
CID=$(docker ps | grep "project_server" | awk '{print $1}')

echo ------- $CID -------
if ["$CID" != "" ]; then
docker stop $CID
docker rm $CID
fi
echo ---------------Launching Container...----------
--------
docker run -itd -p 80:80 --name="project_server" -d project_server_srv:latest

```


## Référence

[Open source online Markdown editor.](https://pandao.github.io/editor.md/en.html) - Outil de fichier Markdown en ligne



![](https://www.jenkins.io/images/logos/jenkins/jenkins.svg)