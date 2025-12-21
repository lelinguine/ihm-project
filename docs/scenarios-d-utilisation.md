# Scénarios d'utilisation - Application de microblogging

## 1. Consultation du fil d'actualité

### Objectif
Consulter les tweets publiés par les utilisateurs suivis et découvrir du contenu récent.

### Prérequis
- L'utilisateur a lancé l'application
- L'application affiche la page d'accueil par défaut

### Déroulement
1. L'utilisateur lance l'application
2. Le fil d'actualité s'affiche automatiquement en page d'accueil
3. Les tweets sont affichés du plus récent au plus ancien
4. Pour chaque tweet, l'utilisateur peut voir :
   - La photo de profil de l'auteur
   - Le nom d'utilisateur et le pseudonyme (@username)
   - Le contenu du tweet (maximum 280 caractères)
   - La date et l'heure de publication (format relatif : 5s, 2m, 3h, 1j)
   - Une image si elle a été jointe
   - Les indicateurs de réponse ou de retweet
   - Les boutons d'interaction (Répondre, Liker, Retweeter)
   - Les compteurs d'interactions (réponses, retweets, likes)
5. L'utilisateur peut défiler vers le bas pour voir plus de tweets
6. Le chargement des tweets est automatique et fluide

### Résultat attendu
- Le fil d'actualité est réactif et les tweets se chargent rapidement
- L'interface est claire et facile à lire
- Les tweets sont triés chronologiquement

### Composants impliqués
Feed.svelte, TweetCard.svelte

---

## 2. Publication d'un nouveau tweet

### Objectif
Publier un nouveau tweet pour le partager avec ses abonnés.

### Prérequis
- L'utilisateur est connecté
- L'utilisateur se trouve sur le fil d'actualité

### Déroulement
1. L'utilisateur accède à la zone de composition en haut du fil
2. L'utilisateur clique dans la zone de texte
3. L'utilisateur rédige son message :
   - Un compteur de caractères s'affiche (maximum 280)
   - Le compteur change de couleur selon le nombre de caractères restants
   - Le bouton "Publier" est désactivé si le texte est vide ou dépasse la limite
4. Optionnellement, l'utilisateur peut :
   - Ajouter une image via le bouton dédié
   - Prévisualiser l'image ajoutée
   - Supprimer l'image avant publication
5. L'utilisateur clique sur le bouton "Publier"
6. Le tweet est publié immédiatement
7. Le nouveau tweet apparaît en haut du fil d'actualité
8. La zone de composition se vide automatiquement

### Résultat attendu
- Le tweet est publié avec succès
- Le tweet apparaît immédiatement dans le fil
- La zone de composition est réinitialisée
- Un feedback visuel confirme la publication

### Variantes
- Publication avec image
- Publication sans image

### Composants impliqués
TweetComposer.svelte, Feed.svelte

---

## 3. Réponse à un tweet

### Objectif
Interagir avec un tweet en y ajoutant une réponse.

### Prérequis
- L'utilisateur est connecté
- Un tweet est affiché dans le fil

### Déroulement
1. L'utilisateur clique sur le bouton "Répondre" sous un tweet
2. Une modale de réponse s'ouvre avec :
   - Le tweet original affiché en haut
   - Une zone de texte pour la réponse
   - L'indication "En réponse à @username"
3. L'utilisateur rédige sa réponse (maximum 280 caractères)
4. L'utilisateur peut ajouter une image si désiré
5. L'utilisateur clique sur "Répondre"
6. La réponse est publiée et liée au tweet original
7. La modale se ferme
8. Le compteur de réponses du tweet original est incrémenté
9. La réponse apparaît dans le fil avec l'indicateur "En réponse à"

### Résultat attendu
- La réponse est correctement attachée au tweet original
- Le compteur de réponses est mis à jour
- La réponse est visible dans le fil avec l'indicateur approprié
- La modale se ferme après publication

### Variantes
- Annulation de la réponse (bouton fermer ou Échap)
- Réponse avec image

### Composants impliqués
TweetComposer.svelte, TweetCard.svelte, Feed.svelte

---

## 4. Aimer (liker) un tweet

### Objectif
Montrer son appréciation pour un tweet.

### Prérequis
- L'utilisateur est connecté
- Un tweet est affiché

### Déroulement
1. L'utilisateur clique sur le bouton "J'aime" (icône cœur)
2. Le bouton change visuellement de couleur (devient rouge)
3. Le compteur de likes s'incrémente immédiatement
4. Le like est enregistré

### Résultat attendu
- Le changement visuel est immédiat
- Le compteur est mis à jour instantanément
- L'état du like est persistant

### Variantes
- Retirer un like : cliquer à nouveau sur le bouton pour annuler le like

### Composants impliqués
TweetCard.svelte

---

## 5. Retweeter (republier) un tweet

### Objectif
Partager le tweet d'un autre utilisateur avec ses propres abonnés.

### Prérequis
- L'utilisateur est connecté
- Un tweet est affiché

### Déroulement
1. L'utilisateur clique sur le bouton "Retweet" (icône de flèches)
2. Le bouton change visuellement de couleur (devient vert)
3. Le compteur de retweets s'incrémente immédiatement
4. Le retweet apparaît dans le fil avec la mention "Nom a republié"
5. Le retweet est visible pour les abonnés de l'utilisateur

### Résultat attendu
- Le changement visuel est immédiat
- Le compteur est mis à jour instantanément
- Le retweet apparaît dans le fil avec l'indicateur approprié
- L'état du retweet est persistant

### Variantes
- Annuler un retweet : cliquer à nouveau sur le bouton pour retirer le retweet

### Composants impliqués
TweetCard.svelte, Feed.svelte

---

## 6. Consultation d'un profil utilisateur

### Objectif
Consulter les informations publiques, les statistiques et les tweets d'un utilisateur.

### Prérequis
- L'utilisateur est connecté
- Le profil consulté existe

### Déroulement
1. L'utilisateur accède au profil de deux façons possibles :
   - En cliquant sur le bouton "Profil" dans la navigation (pour son propre profil)
   - En cliquant sur le nom ou le pseudonyme d'un utilisateur dans un tweet
2. La page de profil s'affiche avec :
   - Photo de profil
   - Nom complet et nom d'utilisateur (@username)
   - Biographie
   - Date d'inscription
   - Statistiques : nombre de tweets, d'abonnés, d'abonnements
   - Liste des tweets de l'utilisateur
3. L'utilisateur peut :
   - Consulter les tweets de l'utilisateur
   - Cliquer sur les statistiques pour voir les listes
   - Interagir avec les tweets (liker, répondre, retweeter)

### Résultat attendu
- Le profil s'affiche rapidement
- Les informations sont complètes et à jour
- Les tweets de l'utilisateur sont affichés du plus récent au plus ancien
- Les interactions avec les tweets fonctionnent normalement

### Variantes
- Profil personnel : affiche le bouton "Modifier le profil"
- Profil d'un autre utilisateur : affiche le bouton "Suivre" ou "Abonné"

### Composants impliqués
UserProfile.svelte, TweetCard.svelte

---

## 7. Modification du profil

### Objectif
Mettre à jour les informations personnelles de son profil.

### Prérequis
- L'utilisateur est connecté
- L'utilisateur consulte son propre profil

### Déroulement
1. L'utilisateur clique sur le bouton "Modifier le profil"
2. Un formulaire d'édition s'affiche avec les champs :
   - Nom complet (prérempli)
   - Nom d'utilisateur (prérempli)
   - Biographie (préremplie)
3. L'utilisateur modifie les champs souhaités
4. L'utilisateur clique sur "Enregistrer" ou "Annuler"
5. Si "Enregistrer" :
   - Les champs obligatoires sont validés (nom et pseudonyme)
   - Les informations sont mises à jour
   - Le formulaire se ferme
   - Le profil affiche les nouvelles informations
6. Si "Annuler" :
   - Le formulaire se ferme sans sauvegarder
   - Les informations restent inchangées

### Résultat attendu
- Les modifications sont enregistrées correctement
- Les nouvelles informations s'affichent immédiatement
- Les champs obligatoires sont validés
- Un message d'erreur s'affiche si un champ obligatoire est vide

### Composants impliqués
UserProfile.svelte

---

## 8. Recherche d'utilisateurs

### Objectif
Trouver et consulter les profils d'autres utilisateurs.

### Prérequis
- L'utilisateur est connecté

### Déroulement
1. L'utilisateur clique sur le bouton "Rechercher" dans la navigation
2. La page de recherche s'affiche avec une barre de recherche
3. L'utilisateur saisit un terme de recherche (nom ou pseudonyme)
4. Les résultats s'affichent en temps réel pendant la saisie
5. Pour chaque résultat, l'utilisateur voit :
   - Photo de profil
   - Nom complet
   - Nom d'utilisateur (@username)
   - Biographie
   - Bouton "Suivre" ou "Abonné"
6. L'utilisateur peut :
   - Cliquer sur un résultat pour consulter le profil
   - Suivre ou se désabonner directement depuis les résultats
   - Effacer la recherche avec le bouton dédié

### Résultat attendu
- La recherche est instantanée et réactive
- Les résultats excluent l'utilisateur connecté
- Les profils sont cliquables
- Les boutons de suivi fonctionnent correctement
- Un message s'affiche si aucun résultat n'est trouvé

### Composants impliqués
UserSearch.svelte

---

## 9. Suivre ou se désabonner d'un utilisateur

### Objectif
Gérer ses abonnements aux autres utilisateurs.

### Prérequis
- L'utilisateur est connecté
- L'utilisateur consulte un profil ou des résultats de recherche

### Déroulement depuis un profil
1. L'utilisateur consulte le profil d'un autre utilisateur
2. L'utilisateur clique sur le bouton "Suivre" ou "Abonné"
3. L'état de l'abonnement bascule immédiatement
4. Le bouton change de texte et d'apparence
5. Les compteurs d'abonnés/abonnements sont mis à jour

### Déroulement depuis la recherche
1. L'utilisateur effectue une recherche
2. L'utilisateur clique sur "Suivre" ou "Abonné" sur un résultat
3. L'état de l'abonnement bascule immédiatement
4. Le bouton change de texte et d'apparence
5. Un feedback visuel confirme l'action

### Résultat attendu
- Le changement est immédiat et visible
- Les compteurs sont mis à jour instantanément
- L'état est synchronisé sur toutes les vues
- Impossible de se suivre soi-même

### Variantes
- Suivre un utilisateur (non suivi)
- Se désabonner d'un utilisateur (déjà suivi)

### Composants impliqués
UserProfile.svelte, UserSearch.svelte

---

## 10. Consultation des listes d'abonnés et d'abonnements

### Objectif
Consulter la liste des abonnés ou des abonnements d'un utilisateur.

### Prérequis
- L'utilisateur est connecté
- L'utilisateur consulte un profil

### Déroulement
1. L'utilisateur clique sur le nombre d'abonnés ou d'abonnements
2. Une modale s'ouvre avec la liste correspondante
3. Pour chaque utilisateur de la liste, l'affichage montre :
   - Photo de profil
   - Nom complet
   - Nom d'utilisateur (@username)
   - Biographie
   - Bouton "Suivre" ou "Abonné"
4. L'utilisateur peut :
   - Cliquer sur un profil pour le consulter (ferme la modale)
   - Suivre ou se désabonner directement depuis la liste
   - Fermer la modale (bouton fermer, fond, ou touche Échap)

### Résultat attendu
- La modale s'ouvre rapidement avec la liste complète
- Les profils sont cliquables
- Les boutons de suivi fonctionnent correctement
- Les modifications sont reflétées immédiatement
- La modale se ferme facilement

### Variantes
- Liste des abonnés (followers)
- Liste des abonnements (following)

### Composants impliqués
FollowersModal.svelte, UserProfile.svelte

---

## 11. Suppression d'un tweet

### Objectif
Supprimer un de ses propres tweets.

### Prérequis
- L'utilisateur est connecté
- L'utilisateur consulte un de ses propres tweets

### Déroulement
1. L'utilisateur clique sur le bouton "Supprimer" sur son tweet
2. Une demande de confirmation s'affiche
3. L'utilisateur confirme ou annule :
   - Si confirmation : le tweet est supprimé immédiatement
   - Si annulation : le tweet reste inchangé
4. Le tweet disparaît du fil d'actualité
5. Le compteur de tweets dans le profil est décrémenté

### Résultat attendu
- Seuls les tweets de l'utilisateur connecté ont un bouton de suppression
- Une confirmation est demandée avant suppression
- La suppression est immédiate
- Le tweet disparaît de toutes les vues
- Les compteurs sont mis à jour

### Contraintes
- Impossible de supprimer les tweets d'autres utilisateurs
- La suppression est définitive

### Composants impliqués
TweetCard.svelte, Feed.svelte, UserProfile.svelte

---

## 12. Navigation dans l'application

### Objectif
Se déplacer entre les différentes sections de l'application.

### Prérequis
- L'utilisateur est connecté

### Déroulement
1. L'utilisateur utilise le menu de navigation principal avec trois options :
   - Accueil : retourne au fil d'actualité
   - Rechercher : ouvre la page de recherche d'utilisateurs
   - Profil : affiche son propre profil
2. L'utilisateur clique sur une option
3. La vue correspondante s'affiche immédiatement
4. L'option active est visuellement mise en évidence

### Navigation contextuelle
- Clic sur un nom d'utilisateur : affiche le profil de cet utilisateur
- Bouton retour depuis un profil consulté : retourne à la vue précédente
- Clic sur le fond d'une modale : ferme la modale
- Touche Échap : ferme la modale active

### Résultat attendu
- La navigation est instantanée (Single Page Application)
- L'option active est clairement identifiée
- Les modales se ferment facilement
- La navigation au clavier fonctionne correctement

### Composants impliqués
App.svelte, Feed.svelte, UserSearch.svelte, UserProfile.svelte, FollowersModal.svelte

---

## 13. Scénarios d'interactions combinées

### 13.1 Consultation et interaction rapide
1. Consulter le fil d'actualité
2. Liker un tweet
3. Retweeter un tweet
4. Répondre à un tweet
5. Tous les compteurs sont mis à jour en temps réel

### 13.2 Découverte et abonnement
1. Rechercher un utilisateur
2. Consulter son profil depuis les résultats
3. Suivre l'utilisateur
4. Consulter ses tweets
5. Interagir avec ses tweets

### 13.3 Gestion complète du profil
1. Accéder à son profil
2. Modifier ses informations
3. Consulter ses abonnés
4. Suivre un abonné depuis la liste
5. Publier un nouveau tweet
6. Supprimer un ancien tweet

### 13.4 Parcours de conversation
1. Consulter le fil
2. Lire un tweet
3. Répondre au tweet
4. Consulter le profil de l'auteur
5. Suivre l'auteur
6. Retourner au fil

---

## 14. Cas d'erreur et situations exceptionnelles

### 14.1 Tweet vide ou trop long
- Tentative de publication : le bouton reste désactivé
- Aucune action n'est possible jusqu'à correction

### 14.2 Champs de profil obligatoires vides
- Tentative d'enregistrement : un message d'erreur s'affiche
- Le formulaire reste ouvert jusqu'à correction

### 14.3 Recherche sans résultat
- Message "Aucun utilisateur trouvé pour [terme]"
- Possibilité de modifier la recherche

### 14.4 Annulation d'actions
- Réponse à un tweet : bouton fermer ou touche Échap
- Modification de profil : bouton annuler
- Modales : clic sur le fond, bouton fermer, ou touche Échap
- Tous les états reviennent à la normale

---

## 15. Feedback utilisateur

### Actions avec feedback immédiat
- Like : changement de couleur du bouton
- Retweet : changement de couleur du bouton
- Follow : changement de texte du bouton
- Publication : apparition immédiate dans le fil
- Suppression : disparition immédiate du tweet

### Actions avec feedback visuel
- Compteurs mis à jour en temps réel
- Indicateurs d'état (liké, retweeté, suivi)
- Barre de progression des caractères
- Changement de couleur selon le nombre de caractères restants

### Navigation
- Option active mise en évidence dans le menu
- Transitions fluides entre les vues
- Modales avec fond semi-transparent
