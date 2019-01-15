# Client

Pour deployer le client ouvrir une fenetre de commands dans le repertoire /angular-client et executer les commandes "npm i" et  "ng serve"

# Serveur

Pour deployer le client ouvirir une fenetre de commands dans la racine du projet et execute les commandes "npm i" et "node app.js"

# Utilisation 

## Client

Une fois le client et le serveur sont lancés, allez sur le navigateur dans localhost:4200, Là vous trouverez une liste des photos prechrargés. En cliquant sur une des photos vous verez ces details. Vous pouvez passer a la photo suivante ou precedente en cliquent sir les boutons "prev" et "next" respectivement.

Si vous voules ajouter une photo, cliquez le bouton "Upload Photo" situé en haute de la page à droite. Vouz pouvez telecharger une photo et chercher un lieu (addresse, ville, pays, etc) sur le champ de saise de la carte de google maps, dans l'onglet "Location" du formulaire. Si la photo à deja un lieu associé, ce sera affiché sur la carte et peut être modifié si besoin. Si une photo n'as pas une date associé, la photo será ajoutée dans la bd avec la date de creation du fichier.

Pour telecharger la photo vers le serveur, cliquez sur le bouton "Upload" situé en bas de la page à gauche.

Finalement, une fois la photo est telecharge vous serez redirigé a la page des details de la photo, où vpus trouverez les details disponibles de la photo.

## Serveur

Pour tester les services du serveur, vous pouvez utiliser postman avec les urls suivantes:

| URL                  | Type de service      | Action                                                              |
| -------------------- | -------------------- | ------------------------------------------------------------------- |
| /api/photo           | GET                  | Retourne la liste de photos.                                        |
| /api/photo/:photo_id | GET                  | Retourne l'information un format json de la photo correspondente a l'id fourni |
| /api/photo/:photo_id/prev | GET                  | Retourne la photo precedente triée par date |
| /api/photo/:photo_id/next | GET                  | Retourne la photo suivante triée par date |
| /api/photo           | POST                 | Crée une nouvelle photo avec l'information fournie dans le json.    |
| /api/photo/:photo_id | PUT                  | Mets à jour l'information de la photo correspondente a l'id fourni  |
| /api/photo/:photo_id | DELETE               | Supprime la photo  correspondente a l'id fourni                     |
