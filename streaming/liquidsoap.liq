# Ébénénews 72.8 — exemple de source AutoDJ Liquidsoap
# À adapter sur le serveur de streaming. Ne pas héberger ce processus sur GitHub Pages.
# Variables d'environnement attendues : ICECAST_HOST, ICECAST_PORT,
# ICECAST_SOURCE_PASSWORD, STREAM_MOUNT (ex. /stream), MUSIC_DIR.
#
# Exemple de déploiement recommandé : AzuraCast pour gérer Icecast, les médias,
# les playlists et les statistiques sans exposer les identifiants dans le site.
#
# Ce fichier est un modèle de configuration ; tester la syntaxe avec la version
# Liquidsoap installée avant de le mettre en production.

music_dir = getenv("MUSIC_DIR")
icecast_host = getenv("ICECAST_HOST")
icecast_port = int_of_string(getenv("ICECAST_PORT"))
icecast_password = getenv("ICECAST_SOURCE_PASSWORD")
stream_mount = getenv("STREAM_MOUNT")

# Les fichiers audio doivent être copiés dans MUSIC_DIR sur le serveur.
radio = playlist(mode="random", reload_mode="watch", music_dir)

# Répète la playlist lorsqu'elle est terminée.
radio = fallback(track_sensitive=false, [radio, blank(duration=5.)])

output.icecast(
  %mp3(bitrate=128),
  host=icecast_host,
  port=icecast_port,
  password=icecast_password,
  mount=stream_mount,
  name="Ébénénews 72.8",
  description="Radio Ébénénews — diffusion continue",
  genre="Divers",
  radio
)
