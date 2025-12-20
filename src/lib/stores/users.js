import { writable } from 'svelte/store';
import { updateUserTweets } from './tweets';

// Mock data - quelques utilisateurs pour commencer
const initialUsers = [
  {
    id: 1,
    username: 'alice_dev',
    first_name: 'Alice',
    last_name: 'Dupont',
    display_name: 'Alice Dupont',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    bio: 'Développeuse passionnée par Svelte et le web moderne 🚀',
    followers_count: 0,
    following_count: 0,
    tweets_count: 1,
    joined_date: 'Novembre 2024',
  },
  {
    id: 2,
    username: 'bob_code',
    first_name: 'Bob',
    last_name: 'Martin',
    display_name: 'Bob Martin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    bio: 'Développeur fullstack | React & Node.js 💻',
    followers_count: 0,
    following_count: 0,
    tweets_count: 1,
    joined_date: 'Octobre 2024',
  },
  {
    id: 3,
    username: 'claire_ux',
    first_name: 'Claire',
    last_name: 'Fontaine',
    display_name: 'Claire Fontaine',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Claire',
    bio: 'UX Designer | Creating beautiful experiences ✨',
    followers_count: 0,
    following_count: 0,
    tweets_count: 0,
    joined_date: 'Septembre 2024',
  },
  {
    id: 4,
    username: 'alex_kitchen',
    first_name: 'Alex',
    last_name: 'Kitchen',
    display_name: 'Alex Kitchen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    bio: 'Chef de projet tech | Passionné par l\'innovation 🚀',
    followers_count: 0,
    following_count: 0,
    tweets_count: 1,
    joined_date: 'Août 2024',
  },
  {
    id: 5,
    username: 'jeremy_morand',
    first_name: 'Jeremy',
    last_name: 'Morand',
    display_name: 'Jeremy Morand',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jeremy',
    bio: 'Développeur mobile | Flutter & React Native 📱',
    followers_count: 0,
    following_count: 0,
    tweets_count: 1,
    joined_date: 'Juillet 2024',
  },
  {
    id: 6,
    username: 'le_testeur',
    first_name: 'Le',
    last_name: 'Testeur',
    display_name: 'LE_TESTEUR',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Testeur',
    bio: '🤖 Bot de test | Abonné à tous | Tous abonnés à moi 🔁',
    followers_count: 5,
    following_count: 5,
    tweets_count: 2,
    joined_date: 'Décembre 2024',
  },
];

// Store pour tous les utilisateurs
export const users = writable(initialUsers);

// Store pour l'utilisateur connecté (actuellement Alice)
export const currentUser = writable(initialUsers[0]);

// Store pour l'utilisateur affiché (celui dont on voit le profil)
export const viewedUser = writable(initialUsers[0]);

// Store pour gérer les abonnements (qui suit qui)
// Structure: { userId: [array of user IDs they follow] }
export const followings = writable({
  1: [6], // Alice suit LE_TESTEUR
  2: [6],
  3: [6],
  4: [6],
  5: [6],
  6: [1, 2, 3, 4, 5], // LE_TESTEUR suit tout le monde
});

// Fonction pour mettre à jour le profil de l'utilisateur connecté
export function updateCurrentUserProfile(updates) {
  currentUser.update(user => ({
    ...user,
    ...updates
  }));
  
  // Mettre à jour aussi dans la liste des utilisateurs
  users.update(allUsers => 
    allUsers.map(u => {
      if (u.id === updates.id) {
        return { ...u, ...updates };
      }
      return u;
    })
  );
  
  // Mettre à jour les tweets de cet utilisateur
  updateUserTweets(updates.id, updates);
}

// Fonction pour mettre à jour le compteur de tweets d'un utilisateur
export function incrementTweetsCount(userId) {
  users.update(allUsers => {
    return allUsers.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          tweets_count: (user.tweets_count || 0) + 1
        };
      }
      return user;
    });
  });
  
  // Mettre à jour viewedUser si c'est l'utilisateur affiché
  viewedUser.update(viewed => {
    if (viewed && viewed.id === userId) {
      return {
        ...viewed,
        tweets_count: (viewed.tweets_count || 0) + 1
      };
    }
    return viewed;
  });
  
  // Mettre à jour currentUser si c'est l'utilisateur connecté
  currentUser.update(curr => {
    if (curr && curr.id === userId) {
      return {
        ...curr,
        tweets_count: (curr.tweets_count || 0) + 1
      };
    }
    return curr;
  });
}

// Fonction pour décrémenter le compteur de tweets (à la suppression)
export function decrementTweetsCount(userId) {
  users.update(allUsers => {
    return allUsers.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          tweets_count: Math.max(0, (user.tweets_count || 1) - 1)
        };
      }
      return user;
    });
  });
  
  // Mettre à jour viewedUser si c'est l'utilisateur affiché
  viewedUser.update(viewed => {
    if (viewed && viewed.id === userId) {
      return {
        ...viewed,
        tweets_count: Math.max(0, (viewed.tweets_count || 1) - 1)
      };
    }
    return viewed;
  });
  
  // Mettre à jour currentUser si c'est l'utilisateur connecté
  currentUser.update(curr => {
    if (curr && curr.id === userId) {
      return {
        ...curr,
        tweets_count: Math.max(0, (curr.tweets_count || 1) - 1)
      };
    }
    return curr;
  });
}

// Fonction pour rechercher des utilisateurs par nom, prénom ou pseudo
export function searchUsers(query) {
  if (!query || query.trim() === '') {
    return [];
  }
  
  const searchTerm = query.toLowerCase().trim();
  let foundUsers = [];
  
  users.subscribe(allUsers => {
    foundUsers = allUsers.filter(user => 
      user.username.toLowerCase().includes(searchTerm) ||
      user.first_name.toLowerCase().includes(searchTerm) ||
      user.last_name.toLowerCase().includes(searchTerm) ||
      user.display_name.toLowerCase().includes(searchTerm)
    );
  })();
  
  return foundUsers;
}

// Fonction pour obtenir un utilisateur par ID
export function getUserById(id) {
  let user = null;
  users.subscribe(allUsers => {
    user = allUsers.find(u => u.id === id);
  })();
  return user;
}

// Fonction pour afficher le profil d'un utilisateur
export function viewUserProfile(userId) {
  const user = getUserById(userId);
  if (user) {
    viewedUser.set(user);
  }
}

// Fonction pour revenir à son propre profil
export function viewOwnProfile() {
  let user;
  const unsubscribe = currentUser.subscribe(u => {
    user = u;
  });
  unsubscribe();
  viewedUser.set(user);
}

// Fonction pour suivre/ne plus suivre un utilisateur
export function toggleFollow(currentUserId, targetUserId) {
  followings.update(follows => {
    const userFollows = follows[currentUserId] || [];
    const isFollowing = userFollows.includes(targetUserId);
    
    if (isFollowing) {
      // Ne plus suivre
      follows[currentUserId] = userFollows.filter(id => id !== targetUserId);
    } else {
      // Suivre
      follows[currentUserId] = [...userFollows, targetUserId];
    }
    
    return follows;
  });
  
  // Mettre à jour les compteurs
  updateFollowCounts();
}

// Fonction pour mettre à jour les compteurs d'abonnés/abonnements
function updateFollowCounts() {
  try {
    users.update(allUsers => {
      let currentFollowings = {};
      const unsubFollowings = followings.subscribe(f => currentFollowings = f);
      unsubFollowings();
      
      return allUsers.map(user => {
        const following_count = (currentFollowings[user.id] || []).length;
        
        let followers_count = 0;
        Object.entries(currentFollowings).forEach(([userId, follows]) => {
          if (follows.includes(user.id)) {
            followers_count++;
          }
        });
        
        return {
          ...user,
          following_count,
          followers_count
        };
      });
    });
    
    // Mettre à jour viewedUser après la mise à jour de users
    viewedUser.update(viewed => {
      if (!viewed) return viewed;
      
      let updated = viewed;
      const unsubUsers = users.subscribe(allUsers => {
        const found = allUsers.find(u => u.id === viewed.id);
        if (found) updated = found;
      });
      unsubUsers();
      
      return updated;
    });
  } catch (error) {
    console.error('Erreur dans updateFollowCounts:', error);
  }
}

// Fonction pour vérifier si on suit un utilisateur
export function isFollowing(currentUserId, targetUserId) {
  let result = false;
  followings.subscribe(follows => {
    const userFollows = follows[currentUserId] || [];
    result = userFollows.includes(targetUserId);
  })();
  return result;
}
