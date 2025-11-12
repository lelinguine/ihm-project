import { writable } from 'svelte/store';

// Mock data - quelques tweets pour commencer
const initialTweets = [
  {
    id: 1,
    author_id: 1,
    author_name: 'Alice Dupont',
    author_username: 'alice_dev',
    author_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    content: 'Premier tweet sur notre nouvelle application Twitter-like avec Svelte ! 🚀',
    created_at: new Date('2025-11-12T14:30:00'),
    likes_count: 12,
    retweets_count: 3,
    replies_count: 2,
    reply_to_id: null,
  },
  {
    id: 2,
    author_id: 2,
    author_name: 'Bob Martin',
    author_username: 'bob_code',
    author_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    content: 'Svelte est incroyable pour ce genre de projet ! La réactivité native simplifie tout. 🔥',
    created_at: new Date('2025-11-12T15:00:00'),
    likes_count: 8,
    retweets_count: 1,
    replies_count: 0,
    reply_to_id: null,
  },
  {
    id: 3,
    author_id: 1,
    author_name: 'Alice Dupont',
    author_username: 'alice_dev',
    author_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    content: '@bob_code Exactement ! Pas besoin de useState ou useEffect, tout est tellement plus simple.',
    created_at: new Date('2025-11-12T15:15:00'),
    likes_count: 5,
    retweets_count: 0,
    replies_count: 0,
    reply_to_id: 2,
  },
];

// Store pour les tweets
export const tweets = writable(initialTweets);

// Store pour l'utilisateur connecté
export const currentUser = writable({
  id: 1,
  username: 'alice_dev',
  display_name: 'Alice Dupont',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
  bio: 'Développeuse passionnée par Svelte et le web moderne',
  followers_count: 142,
  following_count: 89,
  tweets_count: 234,
});

// Fonction pour ajouter un tweet
export function addTweet(content, replyToId = null) {
  tweets.update(currentTweets => {
    const newTweet = {
      id: Date.now(),
      author_id: 1,
      author_name: 'Alice Dupont',
      author_username: 'alice_dev',
      author_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
      content,
      created_at: new Date(),
      likes_count: 0,
      retweets_count: 0,
      replies_count: 0,
      reply_to_id: replyToId,
    };
    return [newTweet, ...currentTweets];
  });
}

// Fonction pour liker un tweet
export function likeTweet(tweetId) {
  tweets.update(currentTweets => {
    return currentTweets.map(tweet => {
      if (tweet.id === tweetId) {
        return { ...tweet, likes_count: tweet.likes_count + 1 };
      }
      return tweet;
    });
  });
}

// Fonction pour répondre à un tweet
export function replyToTweet(tweetId, content) {
  addTweet(content, tweetId);
  
  // Incrémenter le compteur de réponses
  tweets.update(currentTweets => {
    return currentTweets.map(tweet => {
      if (tweet.id === tweetId) {
        return { ...tweet, replies_count: tweet.replies_count + 1 };
      }
      return tweet;
    });
  });
}
