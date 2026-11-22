# Sécurité — Ébénénews 72.8

## Règles obligatoires

- Ne jamais publier de mots de passe, jetons, clés API ou identifiants administrateur.
- Ne jamais faire l'authentification administrateur uniquement en JavaScript côté navigateur.
- Utiliser une authentification côté serveur, des mots de passe hachés, des sessions sécurisées, une limitation des tentatives et une procédure de réinitialisation.
- Valider et limiter les messages de chat côté serveur ; échapper les sorties HTML ; prévoir anti-spam et modération.
- Enregistrer les statistiques d'audience côté serveur si elles doivent représenter l'ensemble des auditeurs.
- Ne pas considérer des statistiques stockées dans le navigateur comme des statistiques globales.
- Garder les secrets dans les variables d'environnement du serveur ou dans les secrets du fournisseur d'hébergement.
- Changer tout mot de passe de démonstration qui aurait été réutilisé ailleurs.

## État du dépôt

La page GitHub Pages actuelle est une interface statique. Elle ne peut pas sécuriser à elle seule un compte administrateur, un chat public ou des statistiques globales. Ces fonctionnalités exigent un backend avec contrôles côté serveur. Ne pas afficher d'identifiants de démonstration sur le site public.


## Hachage des mots de passe — Val Town

- Les nouveaux mots de passe sont stockés avec PBKDF2-HMAC-SHA256 (600 000 itérations), un sel aléatoire de 16 octets et un résultat de 256 bits.
- Les anciens hachages SHA-256 restent acceptés lors d'une connexion valide puis sont migrés automatiquement vers PBKDF2. Cette migration ne change pas le mot de passe de l'utilisateur.
- Le SHA-256 historique reste réservé aux jetons de réinitialisation aléatoires à usage unique.
- Les secrets d'environnement ne doivent jamais être lus, copiés ou publiés dans le dépôt, les journaux ou les rapports.
