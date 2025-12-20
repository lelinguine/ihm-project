import { writable, get } from 'svelte/store';
import { currentUser } from './users';
export { currentUser };

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
    likes: [], // IDs des utilisateurs qui ont liké
    retweets: [], // IDs des utilisateurs qui ont retweete
    replies_count: 2,
    reply_to_id: null,
    is_retweet: false,
    original_tweet_id: null,
    retweeted_by: null,
    image_url: null, // Nouvelle propriété pour les images
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
    image_url: null,
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
    image_url: null,
  },
];

// Store pour les tweets
export const tweets = writable(initialTweets);

// Fonction pour ajouter un tweet (avec image optionnelle)
export function addTweet(content, replyToId = null, imageUrl = null) {
  const user = get(currentUser);
  
  tweets.update(currentTweets => {
    const newTweet = {
      id: Date.now(),
      author_id: user.id,
      author_name: user.display_name,
      author_username: user.username,
      author_avatar: user.avatar,
      content,
      created_at: new Date(),
      likes: [],
      retweets: [],
      replies_count: 0,
      reply_to_id: replyToId,
      is_retweet: false,
      original_tweet_id: null,
      retweeted_by: null,
      image_url: imageUrl,
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

// Fonction pour toggle le like (like/unlike)
export function toggleLike(tweetId, userId) {
  tweets.update(currentTweets => {
    return currentTweets.map(tweet => {
      if (tweet.id === tweetId) {
        const likes = tweet.likes || [];
        const hasLiked = likes.includes(userId);
        
        return {
          ...tweet,
          likes: hasLiked
            ? likes.filter(id => id !== userId) // Unlike - retirer
            : [...likes, userId] // Like - ajouter
        };
      }
      return tweet;
    });
  });
}

// Fonction pour retweet/republier
export function toggleRetweet(tweetId, userId, userName) {
  tweets.update(currentTweets => {
    const originalTweet = currentTweets.find(t => t.id === tweetId && !t.is_retweet);
    if (!originalTweet) return currentTweets;
    
    const retweets = originalTweet.retweets || [];
    const hasRetweeted = retweets.includes(userId);
    
    if (hasRetweeted) {
      // Annuler le retweet - supprimer le tweet retweete
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
          username: originalTweet.author_username
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

// Fonction pour obtenir les commentaires d'un tweet
export function getTweetReplies(tweetId) {
  let replies = [];
  tweets.subscribe(allTweets => {
    replies = allTweets.filter(tweet => tweet.reply_to_id === tweetId);
  })();
  return replies;
}

// Fonction pour mettre à jour les tweets d'un utilisateur quand son profil change
export function updateUserTweets(userId, userUpdates) {
  tweets.update(allTweets => 
    allTweets.map(tweet => {
      if (tweet.author_id === userId) {
        return {
          ...tweet,
          author_name: userUpdates.display_name || tweet.author_name,
          author_username: userUpdates.username || tweet.author_username,
        };
      }
      return tweet;
    })
  );
}
