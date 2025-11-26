import { writable } from 'svelte/store';

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
    followers_count: 142,
    following_count: 89,
    tweets_count: 234,
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
    followers_count: 89,
    following_count: 124,
    tweets_count: 156,
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
    followers_count: 203,
    following_count: 76,
    tweets_count: 342,
    joined_date: 'Septembre 2024',
  },
];

// Store pour tous les utilisateurs
export const users = writable(initialUsers);

// Store pour l'utilisateur connecté (actuellement Alice)
export const currentUser = writable(initialUsers[0]);

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
