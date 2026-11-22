# Passage de maintenance — 22 novembre 2026

## Amélioration de sécurité réellement intégrée
- Renforcement du stockage des mots de passe dans Val Town `server.ts`, fusionné de la branche `password-hash-hardening` vers `main` (version Val Town 179).
- Les nouveaux mots de passe et ceux définis après une réinitialisation sont désormais hachés avec PBKDF2-HMAC-SHA256, 600 000 itérations, sel aléatoire de 16 octets et résultat de 256 bits.
- Les anciens hachages SHA-256 restent vérifiables : au prochain login réussi, ils sont remplacés par un hachage PBKDF2 sans changer le mot de passe de l'utilisateur. La mise à jour SQL est conditionnelle à l'ancien hachage.
- Le SHA-256 historique est conservé uniquement pour les jetons de réinitialisation à forte entropie ; il n'est plus utilisé pour stocker les nouveaux mots de passe.
- Ajout de `password-hash.test.ts` : le test crée deux comptes techniques temporaires, vérifie un login PBKDF2, le rejet d'un mauvais mot de passe et la migration d'un ancien hachage, puis supprime les comptes et sessions de test.
- Test exécuté sur `main` : **PASS**. Aucun mot de passe réel, compte existant ou secret n'a été modifié ou lu.

## Vérifications du site et du backend
- GitHub Pages répond HTTP 200 pour l'accueil, `radio.html`, `jeux.html` et `author-studio.html`.
- La page publique contient les accès Jeux et Studio des auteurs. La page Studio est disponible, mais son texte précise que le micro est seulement contrôlé localement : aucun son n'est envoyé à l'antenne tant que le transport audio n'est pas raccordé.
- `radio-config.js` conserve `streamUrl` vide. Il n'existe donc toujours pas de flux audio public permanent configuré.
- Val Town `ninjantox/ebenenews-radio`, branche `main`, version 179 après la fusion de sécurité : `/api/health` répond 200 et annonce 2 morceaux ; `/api/content` répond 200 avec 2 morceaux, 0 programme et 1 annonce RSS automatique ; `/api/radio-state` répond 200 et indique le mode musique.
- Sans session, `/api/account/me` répond 401 ; les API d'administration testées répondent 403. La page `/admin` sert une coquille HTML en 200, mais les données restent derrière les API protégées.
- `/api/admin/stats` répond 403 sans session : l'existence et les chiffres de ce tableau de bord ne peuvent donc pas être confirmés sans connexion administrateur.
- La connexion réussie du compte propriétaire n'a pas été testée : aucun identifiant ni mot de passe n'a été fourni pour un test réel. Une variable d'environnement dédiée aux réponses administrateur du chat est renseignée selon ses métadonnées, mais cela ne prouve pas que le mot de passe du compte administrateur fonctionne. Sa valeur n'a pas été consultée.
- Le programme `schedule.ts` est actif avec un intervalle de 15 minutes. Quatre exécutions observées sur la dernière heure ont réussi ; les journaux indiquent qu'aucune annonce programmée n'était en attente et affichent un avertissement de dépréciation Node concernant `punycode`.
- Le moteur radio met à jour l'état et le planning, mais cela ne crée pas un flux audio continu. Le direct 24 h/24 et le transport micro restent bloqués par l'absence d'un hébergeur Icecast/AzuraCast.

## Mesures d'audience disponibles
- Les écoutes audio, auditeurs uniques et durées globales ne sont toujours pas mesurés de façon fiable côté serveur.
- La présence des comptes connectés n'est pas équivalente aux auditeurs radio.
- Les compteurs affichés dans le Studio auteur sont indicatifs et ne prouvent pas que le micro est reçu par les auditeurs.
- Aucun chiffre de visites ou d'écoutes globales n'est inventé dans cet audit.

## Priorités de reprise
1. **P0 — Flux permanent :** choisir/déployer un hébergeur radio toujours allumé, obtenir l'URL publique du flux et tester depuis un réseau extérieur avant de renseigner `radio-config.js`.
2. **P1 — Statistiques réelles :** instrumenter les démarrages et durées d'écoute côté serveur avec des identifiants de session pseudonymisés ; distinguer visites, comptes connectés et auditeurs.
3. **P1 — Administration :** après une connexion réelle autorisée du propriétaire, vérifier le tableau de bord et les chiffres ; ne pas utiliser le secret du chat comme mot de passe de compte.
4. **P1 — Studio/Auteur :** vérifier les permissions auteur et administrateur, puis raccorder le micro au vrai serveur de diffusion ; intégrer la branche `author-portal-dev` seulement après comparaison des schémas et sauvegarde.
5. **P1 — Chat :** rapprocher les espaces de discussion après cartographie et sauvegarde des messages, sans perte de données.
6. **P2 — Programmes :** créer une programmation réelle et gérer les annonces avec une distinction claire entre flashs RSS et annonces personnelles.
7. **P2 — Lecteur et jeux :** tester les interactions sur appareils réels et améliorer le lecteur après installation du flux.
8. **P3 — Maintenance :** identifier l'origine de l'avertissement `punycode` avant toute mise à jour de dépendance.

---

# Passage de maintenance — 21 novembre 2026

## Changements de ce passage
- Neutralisation de 7 anciens workflows GitHub Actions qui tentaient encore de modifier `index.html`, désormais simple page de redirection vers `radio.html`.
- Ces anciens workflows sont maintenant manuels et sans permission d'écriture. Ils ne peuvent plus réintroduire les anciens comptes locaux du navigateur ni les anciens codes d'administration côté client.
- Renforcement de `.github/workflows/validate.yml` : vérification des pages Radio/Jeux, des éléments attendus, des marqueurs d'authentification locale obsolète et de la syntaxe JavaScript.
- Aucun code Val Town, compte, mot de passe ou secret n'a été modifié ou lu.

## État vérifié le 21 novembre 2026
- Le dépôt est accessible, branche principale `main`, dernier commit avant ce passage : `ca8c9665819dc3d0ca16c737d6f1cce9940ce468`.
- Le site public répond en HTTP 200 pour la page d'accueil, `radio.html` et `jeux.html`. La page d'accueil redirige vers la radio. La page Radio contient le lien Jeux ; la page Jeux présente le quiz, le jeu de mémoire et le test de réflexes.
- Le dernier déploiement GitHub Pages observé avant ce passage avait réussi. Le déploiement déclenché par ce nouveau commit doit encore être confirmé.
- Val Town `ninjantox/ebenenews-radio` : branche `main` version 156 ; endpoint principal actif.
- `/api/health` répond 200 et annonce 2 morceaux. `/api/content` répond 200 : 2 morceaux, 0 programme, 0 annonce. `/api/radio-state` répond 200 et indique le morceau courant.
- `/api/chat` sur le backend principal contient 0 message au moment du contrôle ; le endpoint séparé `live-chat.ts` contient 5 messages. Les deux chats restent distincts : aucune fusion ni suppression n'a été tentée.
- `/api/admin/stats` répond 404 : les statistiques d'écoute ne sont pas encore implémentées.
- Sans session, `/api/account/me` répond 401 et les API `/api/admin/online` et `/api/admin/users` répondent 403. La page `/admin` répond 200 car elle sert une coquille HTML ; les données restent derrière les API protégées. Une connexion réussie au compte administrateur n'a pas été testée.
- La clé d'environnement destinée aux réponses administrateur du chat est présente et non vide selon ses métadonnées ; sa valeur n'a pas été consultée. Elle ne prouve pas à elle seule que le mot de passe du compte administrateur fonctionne.
- La branche Val Town `author-portal-dev` reste séparée de `main` (version 59, 10 fichiers). Sa page Auteur répond 200 et propose connexion, demande de compte et dépôt de morceaux ; elle ne présente pas encore de statistiques d'écoute. Sans session, ses API de dépôt répondent 403 (`author_required`), l'API de file d'attente répond 403 (`admin_required`) et `/api/account/me` répond 401. Aucun merge n'a été tenté.
- Les deux URL audio de la bibliothèque répondent en HTTP 200 avec `audio/mpeg` via le service audio de la branche de développement. Le serveur annonce `Accept-Ranges: none` ; la recherche dans les morceaux n'est pas disponible.
- `radio-config.js` garde `streamUrl` vide : aucun flux permanent 24 h/24 n'est actuellement configuré.
- Le fichier historique `musique1.mp3` du dépôt ne fait que 2 octets et n'est pas un fichier audio exploitable ; il n'est pas référencé par la bibliothèque Val Town actuelle. Il n'a pas été supprimé.

## Automatisations GitHub
- Le workflow historique `Repair Ébénénews radio` échouait car il cherchait l'ancien lecteur dans `index.html`, alors que le lecteur actuel se trouve dans `radio.html`.
- Plusieurs autres anciens workflows modifiaient également `index.html` et certains contenaient des mécanismes de compte local ou des codes d'administration côté navigateur. Ils ont été rendus manuels et sans écriture.
- Le workflow `validate.yml` reste le contrôle automatique sur push et pull request. Les workflows de déploiement Pages n'ont pas été désactivés.
- Les anciens commits restent dans l'historique Git ; aucune réécriture d'historique n'a été faite.

## Priorités de reprise
1. **P0 — Flux permanent :** installer/configurer AzuraCast ou Icecast + Liquidsoap sur un serveur toujours allumé ; ne renseigner l'URL publique qu'après un test depuis un autre réseau.
2. **P1 — Statistiques :** créer une mesure serveur des démarrages et durées d'écoute, sessions pseudonymisées et titres joués ; distinguer visites, comptes connectés et auditeurs.
3. **P1 — Administration :** ajouter un endpoint de statistiques réel et un tableau de bord fondé uniquement sur les mesures disponibles ; continuer à vérifier les API protégées sans lire de secret.
4. **P1 — Chat :** rapprocher les deux espaces après sauvegarde et cartographie des données, sans perdre les 5 messages du chat public.
5. **P1 — Auteur :** comparer les schémas et dépendances de `author-portal-dev` avec `main`, puis intégrer progressivement les fonctions de dépôt et de validation ; ajouter les statistiques par auteur uniquement après instrumentation.
6. **P2 — Audio :** étudier les requêtes HTTP Range et les tests de lecture sur téléphone/ordinateur.
7. **P2 — Programmes/annonces :** compléter les contenus et vérifier leur affichage public.
8. **P3 — Jeux :** tester les interactions dans de vrais navigateurs mobile et ordinateur, puis enrichir la collection.

---

# Passage de maintenance — 20 novembre 2026

## Changements de ce passage
- Ajout de `jeux.html` avec trois jeux autonomes : quiz, mémoire et réflexes.
- Ajout d'un lien vers les jeux dans l'en-tête de `radio.html`.
- Documentation de la page Jeux dans `README.md`.
- Les jeux n'utilisent ni compte, ni API, ni bibliothèque externe. Le record de réflexes est stocké uniquement dans le navigateur.

## État vérifié le 20 novembre 2026
- Le dépôt GitHub est accessible et la branche principale est `main`. Les changements de ce passage ont été commités ; l'accès direct au site GitHub Pages a échoué depuis l'environnement de contrôle, donc la publication visible en ligne reste à confirmer.
- Val Town `/api/health` répond 200 et annonce 2 morceaux.
- `/api/content` répond 200 : 2 morceaux, 0 programme et 0 annonce.
- `/api/radio-state` répond 200 et indique le morceau courant.
- Les deux URL audio référencées par la bibliothèque répondent en HEAD 200 avec `audio/mpeg`. Le serveur annonce toutefois `Accept-Ranges: none`, ce qui limite la recherche à l'intérieur d'un morceau.
- `/admin` renvoie une interface HTML (200), mais l'interface vérifie le rôle via `/api/account/me`. Sans session, cette API renvoie 401. Les API `/api/admin/online` et `/api/admin/users` renvoient 403 sans session administrateur.
- Aucune connexion réussie au compte administrateur n'a été testée. Le secret configuré dans l'environnement est destiné aux réponses administrateur du chat ; il ne prouve pas à lui seul que l'authentification du compte fonctionne. Aucune valeur secrète n'a été lue.
- Le chat public sur `live-chat.ts` contient 5 messages au moment du contrôle, tandis que `/api/chat` sur `main.ts` en contient 0. La page publique et le tableau de bord semblent utiliser deux espaces de chat distincts : ne pas fusionner les données sans audit et sauvegarde.
- La branche Val Town `author-portal-dev` contient des fichiers Auteur/Audio/Sync plus récents, mais reste séparée de `main`. Elle n'a pas été fusionnée.
- `/api/admin/stats` renvoie 404. Les écoutes, auditeurs uniques et durées ne sont donc pas encore mesurés par un endpoint de statistiques dédié. Le compteur `/api/admin/online` correspond aux personnes connectées à un compte, pas nécessairement aux auditeurs de la radio.
- Le flux permanent n'est toujours pas configuré dans `radio-config.js` ; la playlist du navigateur ne constitue pas un flux radio commun 24 h/24.

## Priorités de reprise
1. **P0 — Flux permanent :** installer/configurer un serveur de diffusion (AzuraCast ou Icecast + Liquidsoap), puis tester le flux avant de renseigner son URL publique.
2. **P1 — Chat :** auditer les deux espaces de chat et les rapprocher sans perdre les messages ni affaiblir les contrôles administrateur.
3. **P1 — Auteur :** examiner `author-portal-dev` et ses contrôles d'accès, puis préparer une intégration progressive et réversible.
4. **P1 — Statistiques :** instrumenter les démarrages et durées d'écoute avec des sessions pseudonymisées ; distinguer visites, comptes connectés et auditeurs.
5. **P2 — Administration :** ajouter un tableau de bord fondé sur des mesures réelles ; le point d'entrée statistiques actuel renvoie 404.
6. **P2 — Programmes/annonces :** compléter la programmation et vérifier leur affichage public.
7. **P2 — Audio :** étudier le support des requêtes HTTP Range pour permettre la recherche dans les morceaux.
8. **P3 — Jeux :** vérifier la page sur GitHub Pages, puis enrichir la collection après tests mobile/ordinateur.

---

# Audit technique — Ébénénews 72.8

## État vérifié le 19 novembre 2026

- Le site GitHub Pages répond en HTTP 200. Le lien vers la vraie connexion/administration Val Town est maintenant visible depuis `radio.html`.
- Le backend Val Town répond en HTTP 200 sur `/api/health`. `/api/content` retourne 2 morceaux, 0 programme et 0 annonce.
- Les deux fichiers audio publiés répondent en HTTP 200 avec le type `audio/mpeg`.
- `radio-config.js` garde `streamUrl` vide : aucun flux commun permanent n'est encore configuré.
- La base contient 1 compte administrateur et 2 comptes auteurs. Sans session, `/api/account/me` répond 401 et les API d'administration répondent 403. Le secret réservé aux réponses administrateur du chat est présent dans l'environnement Val Town ; sa valeur n'a pas été lue. Cela ne prouve pas à lui seul qu'une connexion réelle avec le compte administrateur a réussi.
- Le portail auteur existe sur la branche `author-portal-dev`, mais n'est pas intégré à `main`. Il permet les dépôts et validations ; aucune API de statistiques d'écoute auteur n'a été trouvée.
- La base ne contient pas de table d'événements d'écoute. `user_presence` mesure la présence de comptes connectés, pas les auditeurs radio. Les écoutes, auditeurs uniques et durées ne sont donc pas encore mesurables.
- Le chat Val Town répond en HTTP 200 et contient 4 messages enregistrés au moment du contrôle.

## Priorités de reprise

1. **P0 — Flux permanent :** installer/configurer un vrai serveur de diffusion et renseigner son URL publique dans `radio-config.js` uniquement après un test réel.
2. **P1 — Administration :** vérifier une connexion administrateur réussie avec les identifiants saisis par le propriétaire, sans lire ni stocker le mot de passe ; conserver le verrouillage serveur des API.
3. **P1 — Portail auteur :** auditer la branche de développement puis intégrer progressivement ses fonctions sans écraser les changements plus récents de `main`.
4. **P1 — Statistiques :** ajouter des événements d'écoute fiables (démarrage, durée, titre) et des identifiants de session pseudonymisés ; distinguer clairement comptes connectés et auditeurs.
5. **P2 — Tableau de bord :** présenter les seules mesures réellement disponibles, avec leurs périodes et leurs limites.
6. **P2 — Espace auteur :** calculer les statistiques par auteur et limiter chaque auteur à ses propres contenus ; réserver la vue globale à l'administrateur.
7. **P2 — Contenus :** remplir et gérer les programmes/annonces ; renforcer le chat contre le spam et les abus.
8. **P3 — Jeux :** créer plusieurs jeux réellement jouables, tactiles et adaptés au clavier.
9. **P3 — Audio :** améliorer la reprise, le chargement et la recherche dans les morceaux (le serveur audio annonce actuellement `Accept-Ranges: none`).

---
Ce document reprend l'audit et suit les corrections sans prétendre qu'une infrastructure non déployée est déjà opérationnelle.

## Problèmes prioritaires

### 1. Le direct doit être un vrai flux permanent
Une playlist exécutée dans le navigateur n'est pas une radio 24 h/24 : chaque visiteur peut écouter un morceau différent et la lecture s'arrête lorsque le navigateur ou la page se ferme.

**Correction d'architecture :** héberger l'AutoDJ et le flux sur un serveur toujours allumé (AzuraCast, ou Icecast + Liquidsoap). Le site GitHub Pages sert seulement de lecteur. Voir [streaming/README.md](streaming/README.md).

**État :** lecteur de flux direct ajouté ; URL du flux encore vide car aucun serveur de streaming réel n'a été fourni ou déployé.

### 2. Identifiants administrateur
Aucun mot de passe administrateur ne doit apparaître dans le HTML, le JavaScript, les archives publiques ou les journaux. Un mot de passe déjà réutilisé ailleurs doit être changé.

**Correction :** règles documentées dans [SECURITY.md](SECURITY.md). Les recherches de code effectuées dans les fichiers indexés du dépôt n'ont pas trouvé la chaîne de démonstration signalée dans l'audit ; cela ne garantit pas que chaque archive binaire ou ancienne version soit exempte de secrets.

**État vérifié le 19/11/2026 :** le secret destiné aux réponses administrateur du chat est configuré dans l'environnement Val Town et n'est pas présent dans GitHub. L'authentification du compte d'administration est distincte : elle utilise les comptes et sessions du backend. Les contrôles sans session renvoient bien 401/403 ; une connexion valide n'a pas été simulée avec un mot de passe inconnu.

### 3. Dépendance au backend externe
Le lecteur existant utilise encore l'API Val Town pour charger les morceaux et les annonces. Si cette API tombe, cette partie de la page ne peut pas fonctionner.

**Correction préparée :** le flux permanent a sa configuration séparée dans `radio-config.js`. L'API historique n'a pas été supprimée afin de préserver les fonctionnalités existantes.

**État vérifié le 19/11/2026 :** le backend Val Town est actif et renvoie deux morceaux publiés. Les programmes et annonces sont vides. Le site public dépend toujours de cette API pour la bibliothèque.

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
Le chat est présent dans `radio.html` et utilise un endpoint Val Town séparé. Le contrôle du 19/11/2026 a confirmé que la lecture des messages répond en HTTP 200 et que les réponses administrateur utilisent un secret côté serveur, sans l'exposer au navigateur.

**À renforcer :** vérifier les limites de fréquence, l'anti-spam, la modération et les règles de conservation. Le bouton de la page publique distingue désormais la réponse administrateur au chat de l'accès à l'administration complète.

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
