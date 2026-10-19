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
