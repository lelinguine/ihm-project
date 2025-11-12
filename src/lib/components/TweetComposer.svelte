<script>
  import { addTweet, currentUser } from '$lib/stores/tweets';
  
  let content = '';
  let isSubmitting = false;
  
  $: charactersLeft = 280 - content.length;
  $: isValid = content.trim().length > 0 && content.length <= 280;
  $: progressColor = charactersLeft < 20 ? '#e0245e' : charactersLeft < 40 ? '#ffad1f' : '#1da1f2';
  
  async function handleSubmit() {
    if (!isValid || isSubmitting) return;
    
    isSubmitting = true;
    
    try {
      addTweet(content.trim());
      content = '';
      
      // Animation de succès
      showSuccessMessage();
    } catch (error) {
      console.error('Erreur lors de la publication:', error);
    } finally {
      isSubmitting = false;
    }
  }
  
  function showSuccessMessage() {
    // Simple feedback - pourrait être remplacé par une notification
    console.log('Tweet publié avec succès!');
  }
</script>

<div class="tweet-composer">
  <div class="composer-header">
    <img src={$currentUser.avatar} alt={$currentUser.display_name} class="user-avatar" />
    
    <div class="composer-content">
      <textarea
        bind:value={content}
        placeholder="Quoi de neuf ?"
        class="tweet-input"
        maxlength="280"
        rows="3"
      ></textarea>
      
      <div class="composer-footer">
        <div class="composer-actions">
          <button class="icon-btn" title="Ajouter une image">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#1da1f2">
              <path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858a.75.75 0 00-.53-.22h-.003a.74.74 0 00-.532.224l-4.317 4.384-1.813-1.806a.75.75 0 00-.53-.22c-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25a.75.75 0 01-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"/>
              <circle cx="8.868" cy="8.309" r="1.542"/>
            </svg>
          </button>
          
          <button class="icon-btn" title="Ajouter un emoji">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#1da1f2">
              <path d="M12 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm0-1.5c4.687 0 8.5-3.813 8.5-8.5S16.687 3.5 12 3.5 3.5 7.313 3.5 12s3.813 8.5 8.5 8.5z"/>
              <circle cx="8.5" cy="10" r="1.5"/>
              <circle cx="15.5" cy="10" r="1.5"/>
              <path d="M12 18c-2.28 0-4.22-1.66-5-4h10c-.78 2.34-2.72 4-5 4z"/>
            </svg>
          </button>
        </div>
        
        <div class="composer-submit">
          {#if content.length > 0}
            <div class="character-counter">
              <svg width="20" height="20" class="progress-ring">
                <circle
                  class="progress-ring-circle"
                  stroke={progressColor}
                  stroke-width="2"
                  fill="transparent"
                  r="8"
                  cx="10"
                  cy="10"
                  style="stroke-dasharray: {50.26 * (content.length / 280)} 50.26"
                />
              </svg>
              {#if charactersLeft < 20}
                <span class="characters-left" class:warning={charactersLeft < 0}>
                  {charactersLeft}
                </span>
              {/if}
            </div>
          {/if}
          
          <button
            class="tweet-button"
            on:click={handleSubmit}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? 'Publication...' : 'Tweeter'}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .tweet-composer {
    border-bottom: 1px solid #e1e8ed;
    padding: 16px;
  }
  
  .composer-header {
    display: flex;
    gap: 12px;
  }
  
  .user-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  
  .composer-content {
    flex: 1;
    min-width: 0;
  }
  
  .tweet-input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 20px;
    resize: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    line-height: 24px;
    padding: 12px 0;
  }
  
  .tweet-input::placeholder {
    color: #657786;
  }
  
  .composer-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 12px;
    border-top: 1px solid #e1e8ed;
  }
  
  .composer-actions {
    display: flex;
    gap: 4px;
  }
  
  .icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 50%;
    transition: background-color 0.2s;
  }
  
  .icon-btn:hover {
    background-color: #e8f5fe;
  }
  
  .composer-submit {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .character-counter {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .progress-ring {
    transform: rotate(-90deg);
  }
  
  .characters-left {
    position: absolute;
    font-size: 12px;
    font-weight: 700;
    color: #657786;
  }
  
  .characters-left.warning {
    color: #e0245e;
  }
  
  .tweet-button {
    background-color: #1da1f2;
    color: white;
    border: none;
    border-radius: 9999px;
    padding: 8px 16px;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .tweet-button:hover:not(:disabled) {
    background-color: #1a91da;
  }
  
  .tweet-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
