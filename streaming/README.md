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


## Faire une émission avec le micro de l'animateur

Le lecteur du site est prêt à recevoir le flux, mais **la diffusion micro ne peut pas être activée tant qu'un serveur de streaming n'existe pas**. GitHub Pages héberge la page, et Val Town héberge l'API du chat ; aucun des deux n'est actuellement le serveur audio Icecast.

### Méthode recommandée pour une émission depuis un PC Windows

1. Choisir un hébergeur radio qui fournit un serveur Icecast ou SHOUTcast et autorise les émissions en direct.
2. Créer la station « Ébénénews 72.8 » chez cet hébergeur et récupérer les informations d'encodeur : adresse du serveur, port, point de montage, identifiant et mot de passe source.
3. Installer **BUTT** (logiciel gratuit qui envoie le son du micro vers un serveur de radio) depuis le site officiel : https://danielnoethen.de/butt/
4. Dans BUTT, ouvrir les réglages, ajouter un serveur de type Icecast/SHOUTcast, puis saisir les informations privées données par l'hébergeur.
5. Sélectionner le micro de l'animateur dans les réglages audio de BUTT. Cliquer sur Connect/Play pour commencer l'émission ; cliquer sur Stop pour la terminer.
6. Copier l'URL publique d'écoute fournie par l'hébergeur. Elle est différente du mot de passe source.
7. Dans ce dépôt GitHub, ouvrir `radio-config.js` et renseigner uniquement l'URL publique :
   ```js
   window.RADIO_CONFIG = Object.freeze({
     streamUrl: "https://ADRESSE-PUBLIQUE-DU-FLUX",
     streamName: "Ébénénews 72.8 — Direct",
     streamMimeType: "audio/mpeg"
   });
   ```
8. Enregistrer le fichier, attendre le déploiement GitHub Pages, puis tester le lecteur Direct sur un téléphone connecté à un autre réseau.

**Important :** ne jamais mettre le mot de passe source, l'identifiant privé ou une clé d'API dans `radio-config.js`, le HTML, le chat ou GitHub. Seule l'URL publique du flux doit apparaître sur le site.

### Si tu veux éviter un abonnement

AzuraCast et Icecast sont des logiciels gratuits, mais ils doivent fonctionner sur un serveur ou un ordinateur accessible depuis Internet. Le serveur doit rester allumé pendant les émissions (et 24 h/24 si tu veux une radio continue). La connexion Internet doit aussi permettre aux auditeurs de recevoir le flux. Le logiciel BUTT est gratuit, mais **ce n'est pas un hébergeur audio**.

Documentation officielle AzuraCast : https://www.azuracast.com/docs/
Documentation officielle Icecast : https://www.icecast.org/docs/


## Parcours gratuit choisi : installer sur un PC Windows 10/11

Cette option n'a pas de coût de licence, mais elle demande une installation technique et le PC doit rester allumé, connecté à Internet et ne pas se mettre en veille pendant l'émission.

1. Vérifier que le PC dispose d'au moins 2 Go de RAM (4 Go recommandés) et de 20 Go d'espace libre.
2. Installer Docker Desktop pour Windows : https://www.docker.com/products/docker-desktop/
3. Pendant l'installation, garder l'option WSL 2 activée. Suivre ensuite le guide officiel Windows d'AzuraCast : https://www.azuracast.com/docs/getting-started/installation/windows/
4. Installer Ubuntu depuis le Microsoft Store si le guide le demande, ouvrir Ubuntu et suivre le guide d'installation Docker d'AzuraCast : https://www.azuracast.com/docs/getting-started/installation/docker/
5. Une fois AzuraCast installé, ouvrir `http://localhost` sur ce PC, créer le compte administrateur et créer la station « Ébénénews 72.8 ».
6. Ajouter les fichiers audio dont tu as le droit de diffuser la musique, puis activer l'AutoDJ si tu veux une programmation automatique.
7. Pour parler au micro, installer BUTT depuis https://danielnoethen.de/butt/ et configurer le serveur avec les identifiants source fournis par AzuraCast. Sélectionner le micro, puis démarrer la diffusion.
8. Avant de connecter le site public, il faudra rendre le flux accessible depuis Internet. `http://localhost` ne fonctionne que sur le PC lui-même. Selon le routeur et le fournisseur Internet, il peut falloir configurer les ports réseau, une adresse publique/DNS et HTTPS. Ne partage pas les identifiants privés.

### Limite réseau importante

Installer AzuraCast localement n'expose pas automatiquement la radio au public. Si le routeur, le fournisseur Internet (par exemple CGNAT) ou le pare-feu empêche les connexions entrantes, les auditeurs ne pourront pas accéder au flux. Dans ce cas, il faudra une solution de tunnel ou un serveur public compatible ; cela peut compliquer l'option entièrement gratuite.

### Ordre de mise en service

- D'abord vérifier que l'interface AzuraCast s'ouvre en local.
- Ensuite vérifier le flux depuis un autre appareil connecté au même réseau.
- Puis tester le flux depuis un téléphone en données mobiles.
- Seulement quand ce test externe réussit, copier l'URL publique d'écoute dans `radio-config.js`.
