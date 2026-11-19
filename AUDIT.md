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
