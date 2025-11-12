<script>
  import { likeTweet } from '$lib/stores/tweets';
  
  export let tweet;
  export let onReply = null;
  
  function formatDate(date) {
    const now = new Date();
    const tweetDate = new Date(date);
    const diffMs = now - tweetDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) return `${diffMins}min`;
    if (diffHours < 24) return `${diffHours}h`;
    return `${diffDays}j`;
  }
  
  function handleLike() {
    likeTweet(tweet.id);
  }
  
  function handleReply() {
    if (onReply) {
      onReply(tweet);
    }
  }
</script>

<article class="tweet-card">
  <div class="tweet-avatar">
    <img src={tweet.author_avatar} alt={tweet.author_name} />
  </div>
  
  <div class="tweet-content">
    <div class="tweet-header">
      <div class="tweet-author">
        <span class="author-name">{tweet.author_name}</span>
        <span class="author-username">@{tweet.author_username}</span>
        <span class="tweet-date">· {formatDate(tweet.created_at)}</span>
      </div>
    </div>
    
    {#if tweet.reply_to_id}
      <div class="reply-indicator">
        <span>En réponse à</span>
      </div>
    {/if}
    
    <div class="tweet-text">
      {tweet.content}
    </div>
    
    <div class="tweet-actions">
      <button class="action-btn reply" on:click={handleReply}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828a.85.85 0 001.465.6l5.613-5.613c.293-.292.455-.682.455-1.094a1.486 1.486 0 00-.438-1.056l-5.593-5.59a.849.849 0 00-1.187-.01l-.01.01a.849.849 0 00.01 1.187l4.99 4.99-3.802 3.803v-2.03a.85.85 0 00-.825-.85h-.1c-3.46 0-5.865-2.477-5.865-6.08 0-3.674 2.818-6.302 6.3-6.302h4.14a.85.85 0 000-1.7z" fill="currentColor"/>
        </svg>
        <span>{tweet.replies_count}</span>
      </button>
      
      <button class="action-btn retweet">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M23.77 15.67a.749.749 0 00-1.06 0l-2.22 2.22V7.65a3.755 3.755 0 00-3.75-3.75h-5.85a.75.75 0 000 1.5h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22a.749.749 0 10-1.06 1.06l3.5 3.5c.145.147.337.22.53.22s.385-.073.53-.22l3.5-3.5a.747.747 0 000-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22a.752.752 0 001.062 0 .749.749 0 000-1.06l-3.5-3.5a.747.747 0 00-1.06 0l-3.5 3.5a.749.749 0 101.06 1.06l2.22-2.22V16.7a3.755 3.755 0 003.75 3.75h5.85a.75.75 0 000-1.5z" fill="currentColor"/>
        </svg>
        <span>{tweet.retweets_count}</span>
      </button>
      
      <button class="action-btn like" on:click={handleLike}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z" fill="currentColor"/>
        </svg>
        <span>{tweet.likes_count}</span>
      </button>
      
      <button class="action-btn share">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M17.53 7.47l-5-5a.749.749 0 00-1.06 0l-5 5a.749.749 0 101.06 1.06l3.72-3.72V15a.75.75 0 001.5 0V4.81l3.72 3.72c.146.147.338.22.53.22a.75.75 0 00.53-1.28zm-11 10l-3.72 3.72V15a.75.75 0 00-1.5 0v10.69l-3.72-3.72a.749.749 0 10-1.06 1.06l5 5c.145.147.337.22.53.22.19 0 .385-.073.53-.22l5-5a.749.749 0 10-1.06-1.06z" fill="currentColor"/>
        </svg>
      </button>
    </div>
  </div>
</article>

<style>
  .tweet-card {
    display: flex;
    gap: 12px;
    padding: 16px;
    border-bottom: 1px solid #e1e8ed;
    transition: background-color 0.2s;
  }
  
  .tweet-card:hover {
    background-color: #f7f9f9;
  }
  
  .tweet-avatar img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
  
  .tweet-content {
    flex: 1;
    min-width: 0;
  }
  
  .tweet-header {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 4px;
  }
  
  .tweet-author {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  .author-name {
    font-weight: 700;
    color: #14171a;
  }
  
  .author-username {
    color: #657786;
  }
  
  .tweet-date {
    color: #657786;
  }
  
  .reply-indicator {
    font-size: 14px;
    color: #657786;
    margin-bottom: 4px;
  }
  
  .tweet-text {
    color: #14171a;
    font-size: 15px;
    line-height: 20px;
    margin-bottom: 12px;
    word-wrap: break-word;
  }
  
  .tweet-actions {
    display: flex;
    justify-content: space-between;
    max-width: 425px;
  }
  
  .action-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    color: #657786;
    cursor: pointer;
    padding: 0;
    font-size: 13px;
    transition: color 0.2s;
  }
  
  .action-btn:hover {
    color: #1da1f2;
  }
  
  .action-btn.reply:hover {
    color: #1da1f2;
  }
  
  .action-btn.retweet:hover {
    color: #17bf63;
  }
  
  .action-btn.like:hover {
    color: #e0245e;
  }
  
  .action-btn svg {
    transition: fill 0.2s;
  }
</style>
