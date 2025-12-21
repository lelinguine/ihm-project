<script>
  import { toggleLike, toggleRetweet, deleteTweet } from '$lib/stores/tweets';
  import { currentUser, viewUserProfile } from '$lib/stores/users';
  
  export let tweet;
  export let onReply; // callback optionnel
  export let onViewProfile; // Callback optionnel pour changer de vue
  
  let isThreadExpanded = false;
  
  function handleNameClick() {
    // Si le parent fournit une fonction de navigation, on lui passe l'utilisateur
    if (onViewProfile) {
      onViewProfile({ id: tweet.author_id });
    } else {
      // Fallback: mettre à jour seulement le store
      viewUserProfile(tweet.author_id);
    }
  }
  
  // Vérifier si l'utilisateur a liké
  $: hasLiked = tweet.likes && $currentUser && tweet.likes.includes($currentUser.id);
  $: likesCount = tweet.likes ? tweet.likes.length : 0;
  
  // Vérifier si l'utilisateur a retweeté
  $: hasRetweeted = tweet.retweets && $currentUser && tweet.retweets.includes($currentUser.id);
  $: retweetsCount = tweet.retweets ? tweet.retweets.length : 0;
  
  function handleLike() {
    if ($currentUser) {
      toggleLike(tweet.id, $currentUser.id);
    }
  }
  
  function handleRetweet() {
    if ($currentUser) {
      toggleRetweet(tweet.id, $currentUser.id, $currentUser.display_name);
    }
  }
  
  function handleReplyClick() {
    if (onReply) {
      onReply(tweet);
    }
  }
  
  function handleDelete() {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce tweet ?')) {
      deleteTweet(tweet.id);
    }
  }
  
  function formatDate(date) {
    const now = new Date();
    const tweetDate = new Date(date);
    const diff = Math.floor((now - tweetDate) / 1000);
    
    if (diff < 60) return `${diff}s`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    return `${Math.floor(diff / 86400)}j`;
  }
</script>

<div class="tweet-card">
  {#if tweet.reply_to_id}
    <div class="reply-indicator">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#657786">
        <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"/>
      </svg>
      <span>En réponse</span>
    </div>
  {/if}
  {#if tweet.is_retweet && tweet.retweeted_by}
    <div class="retweet-info">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M23.615 15.477c-.47-.47-1.23-.47-1.697 0l-1.326 1.326V7.4c0-2.178-1.772-3.95-3.95-3.95h-5.2c-.663 0-1.2.538-1.2 1.2s.537 1.2 1.2 1.2h5.2c.854 0 1.55.695 1.55 1.55v9.403l-1.326-1.326c-.47-.47-1.23-.47-1.697 0s-.47 1.23 0 1.697l3.374 3.375c.234.233.542.35.85.35s.613-.116.848-.35l3.375-3.376c.467-.47.467-1.23-.002-1.697zM12.562 18.5h-5.2c-.854 0-1.55-.695-1.55-1.55V7.547l1.326 1.326c.234.235.542.352.848.352s.614-.117.85-.352c.468-.47.468-1.23 0-1.697L5.46 3.8c-.47-.468-1.23-.468-1.697 0L.388 7.177c-.47.47-.47 1.23 0 1.697s1.23.47 1.697 0L3.41 7.547v9.403c0 2.178 1.772 3.95 3.95 3.95h5.2c.664 0 1.2-.538 1.2-1.2s-.535-1.2-1.198-1.2z"/>
      </svg>
      <span>{tweet.retweeted_by.name} a republié</span>
    </div>
  {/if}
  
  <div class="tweet-content">
    <img src="{tweet.author_avatar}" alt="{tweet.author_name}" class="avatar" />
    
    <div class="tweet-body">
      <div class="tweet-header">
        <button class="author-name-btn" on:click={handleNameClick}>{tweet.author_name}</button>
        <button class="author-username-btn" on:click={handleNameClick}>@{tweet.author_username}</button>
        <span class="separator">·</span>
        <span class="timestamp">{formatDate(tweet.created_at)}</span>
      </div>
      
      <div class="tweet-text">{tweet.content}</div>
      
      {#if tweet.image_url}
        <div class="tweet-image">
          <img src="{tweet.image_url}" alt="Média joint" />
        </div>
      {/if}
      
      <div class="tweet-actions">
        <button class="action-btn" on:click={handleReplyClick} aria-label="Répondre au tweet">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"/>
          </svg>
          {#if tweet.replies_count > 0}
            <span>{tweet.replies_count}</span>
          {/if}
        </button>
        
        <button class="action-btn" class:active={hasRetweeted} on:click={handleRetweet} aria-label="Republier le tweet">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M23.615 15.477c-.47-.47-1.23-.47-1.697 0l-1.326 1.326V7.4c0-2.178-1.772-3.95-3.95-3.95h-5.2c-.663 0-1.2.538-1.2 1.2s.537 1.2 1.2 1.2h5.2c.854 0 1.55.695 1.55 1.55v9.403l-1.326-1.326c-.47-.47-1.23-.47-1.697 0s-.47 1.23 0 1.697l3.374 3.375c.234.233.542.35.85.35s.613-.116.848-.35l3.375-3.376c.467-.47.467-1.23-.002-1.697zM12.562 18.5h-5.2c-.854 0-1.55-.695-1.55-1.55V7.547l1.326 1.326c.234.235.542.352.848.352s.614-.117.85-.352c.468-.47.468-1.23 0-1.697L5.46 3.8c-.47-.468-1.23-.468-1.697 0L.388 7.177c-.47.47-.47 1.23 0 1.697s1.23.47 1.697 0L3.41 7.547v9.403c0 2.178 1.772 3.95 3.95 3.95h5.2c.664 0 1.2-.538 1.2-1.2s-.535-1.2-1.198-1.2z"/>
          </svg>
          {#if retweetsCount > 0}
            <span>{retweetsCount}</span>
          {/if}
        </button>
        
        <button class="action-btn" class:active={hasLiked} on:click={handleLike} aria-label={hasLiked ? 'Retirer le like' : 'Aimer le tweet'}>
          <svg viewBox="0 0 24 24" width="18" height="18">
            {#if hasLiked}
              <path fill="#e0245e" d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z"/>
            {:else}
              <path fill="currentColor" d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"/>
            {/if}
          </svg>
          {#if likesCount > 0}
            <span>{likesCount}</span>
          {/if}
        </button>
        
        <button class="action-btn" aria-label="Partager le tweet">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"/><path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"/>
          </svg>
        </button>
        
        {#if tweet.author_id === $currentUser.id}
          <button class="action-btn delete-btn s-gLms4qaaw-tX" on:click={handleDelete} aria-label="Supprimer le tweet">
            Supprimer
          </button>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .tweet-card {
    border-bottom: 1px solid #e1e8ed;
    padding: 12px 16px;
    transition: background-color 0.2s;
  }

  .tweet-card:hover {
    background-color: #f7f9fa;
  }

  .retweet-info {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    margin-left: 40px;
    color: #657786;
    font-size: 13px;
  }
  
  .reply-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    margin-left: 40px;
    color: #657786;
    font-size: 13px;
  }
  
  .reply-indicator svg {
    flex-shrink: 0;
  }

  .tweet-content {
    display: flex;
    gap: 12px;
  }

  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .tweet-body {
    flex: 1;
    min-width: 0;
  }

  .tweet-header {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 4px;
    flex-wrap: wrap;
  }

  .author-name-btn,
  .author-username-btn {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font-family: inherit;
    cursor: pointer;
    text-decoration: none;
    transition: text-decoration 0.2s;
  }
  
  .author-name-btn {
    font-weight: 700;
    color: #14171a;
    font-size: 15px;
  }
  
  .author-name-btn:hover {
    text-decoration: underline;
  }

  .author-username-btn {
    color: #657786;
    font-size: 15px;
  }
  
  .author-username-btn:hover {
    text-decoration: underline;
  }

  .separator {
    color: #657786;
  }

  .timestamp {
    color: #657786;
    font-size: 15px;
  }

  .tweet-text {
    color: #14171a;
    font-size: 15px;
    line-height: 1.5;
    margin-bottom: 12px;
    word-wrap: break-word;
  }
  
  .tweet-image {
    margin: 12px 0;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #e1e8ed;
  }
  
  .tweet-image img {
    width: 100%;
    height: auto;
    display: block;
  }

  .tweet-actions {
    display: flex;
    gap: 4px;
    max-width: 425px;
  }

  .action-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px;
    border: none;
    background: none;
    border-radius: 50%;
    cursor: pointer;
    color: #657786;
    transition: all 0.2s;
    font-size: 13px;
  }

  .action-btn:hover {
    background-color: rgba(29, 161, 242, 0.1);
    color: #1da1f2;
  }

  .action-btn:nth-child(2):hover {
    background-color: rgba(23, 191, 99, 0.1);
    color: #17bf63;
  }

  .action-btn:nth-child(2).active {
    color: #17bf63;
  }

  .action-btn:nth-child(3):hover {
    background-color: rgba(224, 36, 94, 0.1);
    color: #e0245e;
  }

  .action-btn:nth-child(3).active {
    color: #e0245e;
  }

  .action-btn svg {
    width: 18px;
    height: 18px;
  }

  .delete-btn {
    margin-left: auto;
    background-color: #e0245e;
    color: white;
    border: none;
    border-radius: 9999px;
    padding: 8px 16px;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .delete-btn:hover {
    color: white;
    background-color: #cc2157;
  }
  

</style>
