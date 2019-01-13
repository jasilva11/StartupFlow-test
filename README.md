# Client

Pour deployer le client ouvrir une fenetre de commands dans le repertoire /client et executer le command ng serve

# Serveur

Pour deployer le clinet ouvirir une fenetre de commands dans la racine du projet et execute le command node app.js

# Utilisation 

## Client

Une fois le client et le serveur sont lancés, allez sur le navigateur dans localhost:4200, Là vous trouverez une liste des photos prechrargés. En cliquant sur une des photos vous verez ces details. 

Si vous voules ajouter une photo, cliquez le bouton "Upload Photo" situé en haute de la page à droite. Vouz pouvez telecharger une photo et chercher un lieu (addresse, ville, pays, etc) sur le champ de saise de la carte de google maps, dans l'onglet "Location" du formulaire. Pour telecharger la photo vers le serveur, cliquez le bouton "Upload" situé en bas de la page à gauche.

## Serveur

Pour tester les services du serveur, vous pouvez utiliser postman avec les urls suivantes:

| URL                  | Type de service      | Action                                                              |
| -------------------- | -------------------- | ------------------------------------------------------------------- |
| /api/photo           | GET                  | Retourne la liste de photos.                                        |
| /api/photo/:photo_id | GET                  | Retourne l'information un format json de la photo correspondente a l'id fourni |
| /api/photo           | POST                 | Crée une nouvelle photo avec l'information fournie dans le json.    |
| /api/photo/:photo_id | PUT                  | Mets à jour l'information de la photo correspondente a l'id         |
| /api/photo/:photo_id | DELETE               | Supprime la photo  correspondente a l'id                            |
