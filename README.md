# 📻 Ébénénews 72.8 - Radio en Ligne

Bienvenue sur **Ébénénews 72.8**, une radio en ligne moderne avec système de statistiques d'écoute intégré !

## 🚀 Fonctionnalités

### 🎵 Lecteur Radio
- ▶️ Bouton Écouter
- ⏸️ Pause
- ⏮️ Précédent
- ⏭️ Suivant
- Support de plusieurs chansons (playlist)

### 📊 Statistiques d'Écoute
- ⏱️ **Temps d'écoute total** - suivi en direct
- 🎵 **Nombre de chansons écoutées** - compteur automatique
- ⏰ **Temps actuel du morceau** - synchronisé en temps réel
- 📈 **Durée moyenne par chanson** - calcul automatique
- 🏆 **Top des chansons** - classement des chansons les plus écoutées
- 💾 **Sauvegarde automatique** - les données persistent avec localStorage
- 📥 **Export JSON** - téléchargez vos statistiques

### 💬 Chat en Ligne
- Communiquez avec les autres auditeurs
- Messages en temps réel

### 🔐 Panel Admin
- Connexion sécurisée
- Envoi d'annonces
- **Identifiants de démo :**
  - Utilisateur : `admin`
  - Mot de passe : `ebene72`

### 🤖 Animateur IA
- Annonces aléatoires
- Accueil personnalisé

---

## 📁 Structure du Projet

```
ebenenews-radio/
├── 📄 index.html          # Page principale
├── 📄 README.md           # Ce fichier
└── 📁 music/
    ├── 🎵 musique1.mp3    # Chanson 1
    └── 🎵 musique2.mp3    # Chanson 2
```

---

## 🛠️ Installation & Configuration

### Étape 1️⃣ : Cloner le Repository
```bash
git clone https://github.com/antoninleturgie-arch/ebenenews-radio.git
cd ebenenews-radio
```

### Étape 2️⃣ : Ajouter vos Fichiers MP3

1. Placez vos fichiers MP3 dans le dossier `music/`
2. Nommez-les : `musique1.mp3`, `musique2.mp3`, etc.
3. **Exemple :**
   ```
   music/
   ├── musique1.mp3
   ├── musique2.mp3
   ├── musique3.mp3
   └── musique4.mp3
   ```

### Étape 3️⃣ : Ajouter plus de Chansons

Modifiez la playlist dans `index.html` (ligne ~460) :

```javascript
const playlist = [
    "music/musique1.mp3",
    "music/musique2.mp3",
    "music/musique3.mp3",    // ✅ Ajoutez ici
    "music/musique4.mp3"     // ✅ Et ici
];
```

### Étape 4️⃣ : Lancer le Site

**Option A : Localement**
- Double-cliquez sur `index.html`
- Ou ouvrez-le avec un navigateur

**Option B : Sur un serveur Web**
- Déployez le dossier sur votre hébergement
- Accédez via l'URL

---

## 📊 Utilisation des Statistiques

### Métriques Disponibles
- **Temps d'écoute total** : additionne chaque seconde écoutée
- **Écoutes aujourd'hui** : nombre de chansons lancées
- **Temps actuellement** : position dans le morceau en cours
- **Durée moyenne** : temps d'écoute ÷ nombre de chansons

### Actions Possibles
- 🔄 **Réinitialiser** : efface toutes les statistiques
- 💾 **Exporter** : télécharge un fichier JSON avec les stats

### Données Persistantes
Les statistiques sont automatiquement sauvegardées dans le `localStorage` du navigateur.
Elles persistent même après fermeture du navigateur !

---

## 🎨 Personnalisation

### Modifier le Design
Éditez les couleurs dans `index.html` :
```css
.logo {
    color: #d4af37;  /* Couleur dorée */
}
```

### Changer les Identifiants Admin
Modifiez dans `index.html` (ligne ~710) :
```javascript
if(user === "admin" && password === "ebene72") {
    // Remplacez "admin" et "ebene72" par vos identifiants
}
```

### Ajouter des Annonces IA
Modifiez le tableau `annonces` (ligne ~730) :
```javascript
const annonces = [
    "Bienvenue sur Ébénénews 72.8 !",
    "Votre propre annonce ici !",
    "Une autre annonce"
];
```

---

## 🔧 Technologies Utilisées

- **HTML5** - Structure
- **CSS3** - Styling & Design
- **JavaScript (Vanilla)** - Logique & Statistiques
- **LocalStorage API** - Sauvegarde des données
- **HTML5 Audio API** - Lecteur audio

---

## 📝 Détails Techniques

### Comptage du Temps d'Écoute
- Incrémente de 1 seconde par seconde (chaque 1000ms)
- Sauvegardé automatiquement dans localStorage
- Persiste entre les sessions

### Sauvegarde des Stats
```javascript
{
    "totalTime": 3600,           // secondes
    "listenCount": 15,           // nombre de chansons
    "playlistPlays": {
        "0": 7,                  // musique1.mp3 = 7 fois
        "1": 8                   // musique2.mp3 = 8 fois
    }
}
```

---

## 🐛 Dépannage

### Le lecteur ne fonctionne pas
✅ Vérifiez que les fichiers MP3 sont dans le dossier `music/`
✅ Vérifiez les noms de fichiers correspondent à la playlist

### Les statistiques ne s'affichent pas
✅ Ouvrez la console (F12) et cherchez les erreurs
✅ Vérifiez que JavaScript est activé

### Le site ne s'ouvre pas
✅ Assurez-vous d'ouvrir `index.html` (pas le dossier)
✅ Vérifiez l'URL si vous utilisez un serveur

---

## 📜 Licence

Ébénénews 72.8 © 2026 - antoninleturgie-arch

---

## 🤝 Support & Contact

Pour toute question ou problème :
- 📧 Email : antonin.leturgie@gmail.com
- 💬 GitHub Issues : https://github.com/antoninleturgie-arch/ebenenews-radio/issues

---

**Bon streaming ! 🎵**