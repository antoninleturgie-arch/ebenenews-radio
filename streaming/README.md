# Diffusion permanente Ébénénews 72.8

## Ce qui tourne où

- **GitHub Pages** héberge l'interface web uniquement.
- **Un serveur toujours allumé** héberge l'AutoDJ et le flux audio.
- Les auditeurs se connectent tous au même flux ; fermer la page d'un auditeur n'arrête pas la radio.

GitHub Pages ne peut pas exécuter Liquidsoap/Icecast et ne garantit pas une diffusion 24 h/24 à lui seul.

## Déploiement recommandé

Pour une première installation, utiliser **AzuraCast** sur un VPS ou un ordinateur/serveur toujours allumé. Son installation doit suivre la documentation officielle : https://www.azuracast.com/docs/

1. Installer AzuraCast sur le serveur.
2. Créer la station « Ébénénews 72.8 ».
3. Ajouter uniquement des fichiers audio dont tu possèdes les droits de diffusion.
4. Créer une playlist AutoDJ et activer la lecture continue.
5. Vérifier le flux public depuis un navigateur extérieur au serveur.
6. Copier l'URL publique du flux (souvent une URL se terminant par `/radio/8000/radio.mp3`, mais utilise l'URL réellement affichée par AzuraCast).
7. Ouvrir `radio-config.js` à la racine du dépôt et définir `streamUrl` avec cette URL.
8. Attendre le déploiement GitHub Pages, puis tester depuis un téléphone et un ordinateur.

## Modèle Liquidsoap

Le fichier `liquidsoap.liq` est un modèle d'AutoDJ pour une installation Liquidsoap/Icecast déjà configurée. Il n'est pas lancé par GitHub Pages et n'est pas un déploiement clé en main. Les noms des variables d'environnement et la syntaxe doivent être vérifiés avec la version installée.

Variables à définir **uniquement sur le serveur** :

- `MUSIC_DIR` : dossier des fichiers audio
- `ICECAST_HOST` : hôte Icecast
- `ICECAST_PORT` : port source Icecast
- `ICECAST_SOURCE_PASSWORD` : mot de passe source privé
- `STREAM_MOUNT` : point de montage, par exemple `/stream`

Ne mets jamais le mot de passe Icecast dans `radio-config.js`, le HTML, le dépôt GitHub ou un message public.

## Contrôles avant de déclarer la radio « en direct »

- Le serveur reste actif lorsque personne n'a le site ouvert.
- Le flux fonctionne depuis un réseau externe.
- Le flux ne demande pas le mot de passe source.
- Le flux est continu et plusieurs auditeurs entendent le même programme.
- Le lecteur web ne démarre qu'après un clic utilisateur.
- Les fichiers de la playlist sont de vrais fichiers audio, pas des fichiers texte renommés en MP3.

## Limites actuelles

Le flux n'est pas encore configuré : `radio-config.js` contient volontairement une URL vide. Il faut l'URL du serveur réel pour activer le bouton Direct. Aucun serveur externe n'est créé automatiquement par un commit GitHub.
