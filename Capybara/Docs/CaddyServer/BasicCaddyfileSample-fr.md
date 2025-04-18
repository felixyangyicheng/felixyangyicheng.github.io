
# Exemple d'un Caddyfile.

## Prérequis

Connaissance basique des blocs Caddyfile



## Exemple:

```Caddyfile

https://sample.com {
        handle /api/* {
                uri strip_prefix /api   
                reverse_proxy localhost:8080
                ### ré-écrire https://sample.com/api/user =>  https://sample.com/user
                ### pour avoir => http://localhost:8080/user
        }
        encode zstd gzip
        log {   ### journalisation
                format json
                output file /var/log/caddy/sample.com-access.log {
                roll_size 10mb
                roll_keep 20
                roll_keep_for 720h
        }
  }
}

```


## Référence

[Open source online Markdown editor.](https://pandao.github.io/editor.md/en.html) - Outil de fichier Markdown en ligne
[Caddyfile-tutorial](https://caddyserver.com/docs/caddyfile-tutorial) - Tuto Caddyfile



![](https://caddyserver.com/resources/images/logo-dark.svg)