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
    likes: [],  // IDs des utilisateurs qui ont liké
    retweets: [], // IDs des utilisateurs qui ont retweeté
    replies_count: 2,
    reply_to_id: null,
    is_retweet: false,
    original_tweet_id: null,
    retweeted_by: null,
  },
  {
    id: 2,
    author_id: 2,
    author_name: 'Bob Martin',
    author_username: 'bob_code',
    author_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    content: 'Svelte est incroyable pour ce genre de projet ! La réactivité native simplifie tout. 🔥',
    created_at: new Date('2025-11-12T15:00:00'),
    likes: [1],
    retweets: [],
    replies_count: 1,
    reply_to_id: null,
    is_retweet: false,
    original_tweet_id: null,
    retweeted_by: null,
  },
  {
    id: 3,
    author_id: 1,
    author_name: 'Alice Dupont',
    author_username: 'alice_dev',
    author_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    content: '@bob_code Exactement ! Pas besoin de useState ou useEffect, tout est tellement plus simple.',
    created_at: new Date('2025-11-12T15:15:00'),
    likes: [2],
    retweets: [],
    replies_count: 0,
    reply_to_id: 2,
    is_retweet: false,
    original_tweet_id: null,
    retweeted_by: null,
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
  bio: 'Développeuse passionnée par Svelte et le web moderne 🚀',
  followers_count: 142,
  following_count: 89,
  tweets_count: 234,
  joined_date: 'Novembre 2024',
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
      likes: [],
      retweets: [],
      replies_count: 0,
      reply_to_id: replyToId,
      is_retweet: false,
      original_tweet_id: null,
      retweeted_by: null,
    };
    
    // Si c'est une réponse, incrémenter le compteur
    if (replyToId) {
      currentTweets = currentTweets.map(tweet => {
        if (tweet.id === replyToId) {
          return { ...tweet, replies_count: tweet.replies_count + 1 };
        }
        return tweet;
      });
    }
    
    return [newTweet, ...currentTweets];
  });
}

// Fonction pour toggle le like (like/unlike) - FIX DU PROBLÈME!
export function toggleLike(tweetId, userId) {
  tweets.update(currentTweets => {
    return currentTweets.map(tweet => {
      if (tweet.id === tweetId) {
        const likes = tweet.likes || [];
        const hasLiked = likes.includes(userId);
        
        return {
          ...tweet,
          likes: hasLiked
            ? likes.filter(id => id !== userId)  // Unlike - retirer
            : [...likes, userId]  // Like - ajouter
        };
      }
      return tweet;
    });
  });
}

// Fonction pour retweet/republier - AVEC MESSAGE "Alice Dupont a republié"
export function toggleRetweet(tweetId, userId, userName) {
  tweets.update(currentTweets => {
    const originalTweet = currentTweets.find(t => t.id === tweetId && !t.is_retweet);
    if (!originalTweet) return currentTweets;
    
    const retweets = originalTweet.retweets || [];
    const hasRetweeted = retweets.includes(userId);
    
    if (hasRetweeted) {
      // Annuler le retweet - supprimer le tweet retweeté
      const filtered = currentTweets.filter(t => 
        !(t.is_retweet && t.original_tweet_id === tweetId && t.author_id === userId)
      );
      
      // Mettre à jour le compteur du tweet original
      return filtered.map(tweet => {
        if (tweet.id === tweetId) {
          return {
            ...tweet,
            retweets: retweets.filter(id => id !== userId)
          };
        }
        return tweet;
      });
    } else {
      // Ajouter un retweet
      const retweetTweet = {
        ...originalTweet,
        id: Date.now(),
        is_retweet: true,
        original_tweet_id: tweetId,
        retweeted_by: {
          id: userId,
          name: userName,
          username: 'alice_dev'
        },
        created_at: new Date()
      };
      
      // Mettre à jour les retweets du tweet original
      const updated = currentTweets.map(tweet => {
        if (tweet.id === tweetId) {
          return {
            ...tweet,
            retweets: [...retweets, userId]
          };
        }
        return tweet;
      });
      
      return [retweetTweet, ...updated];
    }
  });
}

// Fonction pour répondre à un tweet
export function replyToTweet(tweetId, content) {
  addTweet(content, tweetId);
}
