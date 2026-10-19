# Audit technique — Ébénénews 72.8

Ce document reprend l'audit et suit les corrections sans prétendre qu'une infrastructure non déployée est déjà opérationnelle.

## Problèmes prioritaires

### 1. Le direct doit être un vrai flux permanent
Une playlist exécutée dans le navigateur n'est pas une radio 24 h/24 : chaque visiteur peut écouter un morceau différent et la lecture s'arrête lorsque le navigateur ou la page se ferme.

**Correction d'architecture :** héberger l'AutoDJ et le flux sur un serveur toujours allumé (AzuraCast, ou Icecast + Liquidsoap). Le site GitHub Pages sert seulement de lecteur. Voir [streaming/README.md](streaming/README.md).

**État :** lecteur de flux direct ajouté ; URL du flux encore vide car aucun serveur de streaming réel n'a été fourni ou déployé.

### 2. Identifiants administrateur
Aucun mot de passe administrateur ne doit apparaître dans le HTML, le JavaScript, les archives publiques ou les journaux. Un mot de passe déjà réutilisé ailleurs doit être changé.

**Correction :** règles documentées dans [SECURITY.md](SECURITY.md). Les recherches de code effectuées dans les fichiers indexés du dépôt n'ont pas trouvé la chaîne de démonstration signalée dans l'audit ; cela ne garantit pas que chaque archive binaire ou ancienne version soit exempte de secrets.

**État :** aucun secret serveur n'a été ajouté au dépôt. Toute authentification réelle doit être effectuée côté serveur.

### 3. Dépendance au backend externe
Le lecteur existant utilise encore l'API Val Town pour charger les morceaux et les annonces. Si cette API tombe, cette partie de la page ne peut pas fonctionner.

**Correction préparée :** le flux permanent a sa configuration séparée dans `radio-config.js`. L'API historique n'a pas été supprimée afin de préserver les fonctionnalités existantes.

**État :** la migration complète des annonces et de la bibliothèque nécessite un backend de remplacement et ses données.

### 4. Démarrage automatique du son
Les navigateurs bloquent généralement la lecture audio sans action de l'utilisateur.

**Correction :** le lecteur ne lance pas automatiquement la musique ; l'auditeur doit appuyer sur Lecture.

### 5. Libellé du direct
Le lecteur de playlist ne doit pas être présenté comme un flux unique en direct.

**Correction :** une section dédiée « Flux direct 24 h/24 » affiche explicitement que le flux n'est pas configuré tant que `streamUrl` est vide.

### 6. Statistiques d'audience
Les statistiques locales du navigateur ne représentent pas l'audience globale et peuvent être perdues ou modifiées.

**Correction requise côté serveur :** collecter les sessions, auditeurs connectés, durées d'écoute et morceaux joués. Les compteurs du navigateur ne doivent pas être présentés comme des statistiques globales.

### 7. Chat public
Le chat doit être protégé côté serveur : validation des messages, échappement HTML, limitation de fréquence, anti-spam et modération.

**État :** la page actuellement publiée dans ce dépôt ne contient pas de chat. Il faut retrouver ou déployer le backend et l'interface correspondants avant de pouvoir sécuriser cette fonctionnalité réelle.

### 8. Organisation du dépôt
Conserver le code et les médias utiles ; ne supprimer aucun ZIP ni fichier musical existant sans vérifier son contenu et son utilité. Ne jamais stocker de secrets dans Git.

## Points déjà présents
- Page en français et mise en page mobile.
- Lecteur audio HTML.
- Boutons précédent/suivant et playlist côté navigateur.
- Échappement des titres avant affichage.
- Documentation du dépôt et configuration du flux séparée.

## Plan de mise en production

1. Installer AzuraCast (ou Icecast + Liquidsoap) sur un serveur toujours allumé.
2. Charger des fichiers audio valides dont la diffusion est autorisée.
3. Tester le flux depuis un autre réseau.
4. Renseigner l'URL publique dans `radio-config.js`.
5. Tester le lecteur sur ordinateur et téléphone, avec clic utilisateur.
6. Déployer un backend sécurisé pour authentification, chat et statistiques si ces fonctionnalités sont nécessaires.
7. Vérifier les archives et l'historique Git avant toute suppression ou rotation de secrets.
