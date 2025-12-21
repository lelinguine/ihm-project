# Cahier des charges

## 1. Introduction

### 1.1 Objectif du projet
L'objectif du projet est de réaliser une application de microblogging similaire à Twitter, permettant aux utilisateurs de publier des tweets, d'interagir avec les publications des autres (retweeter et aimer), et d'avoir accès à une fiche profil. L'application se veut simple, intuitive et adaptée à un usage sur ordinateur et mobile.

### 1.2 Technologies utilisées
- Framework frontend : Svelte
- Gestionnaire d'état : Svelte Stores
- Système de build : Vite
- Langage : JavaScript/TypeScript

## 2. Fonctionnalités principales

### 2.1 Affichage du fil d'actualité

#### 2.1.1 Liste des tweets
- Affichage de tous les tweets du plus récent au plus ancien
- Chargement automatique au défilement

#### 2.1.2 Informations affichées pour chaque tweet
- Pseudonyme de l'auteur (cliquable pour accéder au profil)
- Photo de profil de l'auteur
- Nom d'utilisateur (@username)
- Date de publication (affichée en temps relatif : 5s, 2m, 3h, 1j)
- Contenu textuel du tweet (maximum 280 caractères)
- Image jointe (si présente)
- Indicateur de réponse (si le tweet est une réponse)
- Indicateur de retweet avec nom de l'utilisateur qui a republié

#### 2.1.3 Compteurs d'interactions
- Nombre de réponses
- Nombre de retweets
- Nombre de likes

### 2.2 Publication de tweets

#### 2.2.1 Compositeur de tweets
- Zone de texte pour la rédaction (limite de 280 caractères)
- Indicateur du nombre de caractères restants
- Barre de progression colorée selon le nombre de caractères
- Bouton de publication (désactivé si le tweet est vide ou dépasse la limite)

#### 2.2.2 Ajout de médias
- Possibilité d'ajouter une image au tweet
- Prévisualisation de l'image avant publication
- Option de suppression de l'image avant publication

#### 2.2.3 Publication
- Les tweets publiés apparaissent immédiatement en haut du fil d'actualité
- Message de confirmation après publication réussie

### 2.3 Interactions avec les tweets

#### 2.3.1 Répondre à un tweet
- Bouton "Répondre" sur chaque tweet
- Ouverture d'un compositeur en mode réponse
- Affichage du tweet original au-dessus de la zone de réponse
- Indication visuelle "En réponse à @username"
- Possibilité d'annuler la réponse
- Les réponses sont affichées dans le fil avec un indicateur

#### 2.3.2 Republier (Retweet)
- Bouton de retweet sur chaque tweet
- Changement visuel du bouton une fois retweeté
- Incrémentation du compteur de retweets
- Affichage du retweet dans le fil avec mention "Nom a republié"
- Possibilité d'annuler le retweet

#### 2.3.3 Aimer (Like)
- Bouton "J'aime" sur chaque tweet
- Changement visuel du bouton (couleur) une fois liké
- Incrémentation du compteur de likes
- Possibilité de retirer le like

### 2.4 Profil utilisateur

#### 2.4.1 Accès au profil
- Bouton "Profil" dans la navigation principale pour accéder à son propre profil
- Clic sur le nom ou le pseudonyme d'un utilisateur pour accéder à son profil
- Bouton de retour pour revenir au fil d'actualité

#### 2.4.2 Informations affichées
- Photo de profil
- Nom complet
- Nom d'utilisateur (@username)
- Biographie
- Date d'inscription (mois et année)
- Nombre de tweets publiés
- Nombre d'abonnés (cliquable)
- Nombre d'abonnements (cliquable)

#### 2.4.3 Liste des tweets de l'utilisateur
- Affichage de tous les tweets de l'utilisateur (y compris les retweets)
- Même format que le fil d'actualité
- Tri du plus récent au plus ancien

#### 2.4.4 Gestion des abonnements
- Bouton "Suivre" / "Abonné" pour suivre ou se désabonner d'un utilisateur
- Mise à jour en temps réel des compteurs d'abonnés/abonnements
- Impossible de se suivre soi-même

#### 2.4.5 Modales des abonnés/abonnements
- Clic sur le nombre d'abonnés ouvre une modale avec la liste des abonnés
- Clic sur le nombre d'abonnements ouvre une modale avec la liste des abonnements
- Pour chaque utilisateur dans la liste :
  - Photo de profil
  - Nom complet
  - Nom d'utilisateur
  - Biographie
  - Bouton "Suivre" / "Abonné"
  - Clic sur un utilisateur pour accéder à son profil

#### 2.4.6 Modification du profil
- Bouton "Modifier le profil" (visible uniquement sur son propre profil)
- Formulaire de modification avec :
  - Nom complet (modifiable)
  - Nom d'utilisateur (modifiable)
  - Biographie (modifiable)
- Boutons "Enregistrer" et "Annuler"
- Validation des champs obligatoires (nom et pseudonyme)

### 2.5 Recherche d'utilisateurs

#### 2.5.1 Interface de recherche
- Barre de recherche accessible depuis la navigation
- Icône de recherche dans la barre
- Bouton pour effacer la recherche

#### 2.5.2 Résultats de recherche
- Recherche en temps réel pendant la saisie
- Affichage de tous les utilisateurs correspondants (sauf l'utilisateur connecté)
- Pour chaque résultat :
  - Photo de profil
  - Nom complet
  - Nom d'utilisateur
  - Biographie
  - Bouton "Suivre" / "Abonné"
- Clic sur un utilisateur pour accéder à son profil
- Message "Aucun utilisateur trouvé" si pas de résultats

### 2.6 Suppression de tweets

#### 2.6.1 Suppression
- Bouton de suppression visible uniquement sur ses propres tweets
- Demande de confirmation avant suppression
- Suppression immédiate du tweet du fil
- Mise à jour automatique du compteur de tweets dans le profil

### 2.7 Navigation

#### 2.7.1 Menu de navigation principal
- Accueil : retour au fil d'actualité
- Rechercher : accès à la recherche d'utilisateurs
- Profil : accès à son propre profil
- Indicateur visuel de la page active

#### 2.7.2 Navigation contextuelle
- Clic sur un nom d'utilisateur : accès au profil
- Bouton retour depuis un profil (si ce n'est pas le sien)
- Fermeture des modales par clic sur le fond ou touche Échap

## 3. Aspects techniques

### 3.1 Gestion des données

#### 3.1.1 Store des tweets
- Liste de tous les tweets
- Fonctions : ajouter, supprimer, liker, retweeter
- Mise à jour automatique des métadonnées (compteurs)

#### 3.1.2 Store des utilisateurs
- Liste de tous les utilisateurs
- Utilisateur connecté
- Utilisateur consulté
- Gestion des abonnements
- Fonctions : recherche, mise à jour profil, gestion des abonnements

#### 3.1.3 Persistance
- Données stockées en mémoire (stores Svelte)
- Pas de backend pour cette version

### 3.2 Interface utilisateur

#### 3.2.1 Design
- Interface inspirée de Twitter
- Design responsive (ordinateur et mobile)
- Palette de couleurs cohérente
- Icônes SVG pour les actions

#### 3.2.2 Accessibilité
- Attributs ARIA sur les éléments interactifs
- Navigation au clavier
- Labels descriptifs sur les boutons
- Gestion de la touche Échap pour fermer les modales

#### 3.2.3 Feedback utilisateur
- Changements visuels immédiats sur les interactions
- Animations et transitions fluides
- Messages de confirmation

## 4. Contraintes et limitations

### 4.1 Contraintes techniques
- Limite de 280 caractères par tweet
- Un seul média (image) par tweet
- Pas de vidéos
- Pas de messagerie directe
- Pas de notifications

### 4.2 Données de test
- Utilisateurs prédéfinis pour les tests
- Tweets initiaux pour peupler le fil
- Système d'avatars générés automatiquement (dicebear.com)

## 5. Évolutions futures possibles

- Backend avec API REST
- Authentification utilisateur
- Upload réel d'images
- Support des vidéos
- Système de notifications
- Messagerie directe
- Hashtags et tendances
- Recherche de tweets
- Pagination du fil d'actualité
- Mode sombre
- Fils de discussion complets (thread)
