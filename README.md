# Ébénénews 72.8

Site radio en français, publié avec GitHub Pages.

## Interface web
- Lecteur audio avec commandes précédent/suivant.
- Affichage des annonces et de la bibliothèque lorsque l'API de contenu est disponible.
- Lecteur de flux direct configurable.
- Interface adaptée aux écrans mobiles.
- Le lecteur n'essaie pas de lancer automatiquement le son.

## Mise en ligne GitHub Pages
Le dépôt doit être publié depuis la branche `main` à la racine. Site : https://antoninleturgie-arch.github.io/ebenenews-radio/

## Flux radio 24 h/24
GitHub Pages héberge uniquement le site. Il ne lance pas un AutoDJ permanent.
Pour diffuser le même programme à tous les auditeurs, installer AzuraCast ou Icecast + Liquidsoap sur un VPS/serveur toujours allumé, créer une playlist continue, puis renseigner l'URL publique dans `radio-config.js` (`streamUrl`).

Guide complet : [streaming/README.md](streaming/README.md).

## Sécurité
Lire [SECURITY.md](SECURITY.md). Ne jamais mettre de secrets dans le HTML/JavaScript ou dans le dépôt. Une vraie connexion administrateur, un chat sécurisé et des statistiques globales nécessitent un backend.

## Fichiers audio
Les fichiers du dossier `music/` doivent être de vrais fichiers audio valides. Ne pas considérer un fichier texte portant l'extension `.mp3` comme un morceau exploitable. Ajouter uniquement des médias que tu as le droit de diffuser.
