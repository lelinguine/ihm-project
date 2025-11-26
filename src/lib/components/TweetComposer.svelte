<script>
  import { addTweet } from '$lib/stores/tweets';
  import { currentUser } from '$lib/stores/users';
  
  let content = '';
  let isSubmitting = false;
  let imageUrl = '';
  let imageFile = null;
  let imagePreview = null;
  let fileInput;
  
  $: charactersLeft = 280 - content.length;
  $: isValid = content.trim().length > 0 && content.length <= 280;
  $: progressColor = charactersLeft < 20 ? '#e0245e' : charactersLeft < 40 ? '#ffad1f' : '#1da1f2';
  
  async function handleSubmit() {
    if (!isValid || isSubmitting) return;
    
    isSubmitting = true;
    
    try {
      addTweet(content.trim(), null, imagePreview);
      content = '';
      imageUrl = '';
      imageFile = null;
      imagePreview = null;
      
      // Animation de succès
      showSuccessMessage();
    } catch (error) {
      console.error('Erreur lors de la publication:', error);
    } finally {
      isSubmitting = false;
    }
  }
  
  function handleImageSelect() {
    fileInput.click();
  }
  
  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      imageFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  function removeImage() {
    imageFile = null;
    imagePreview = null;
    imageUrl = '';
    if (fileInput) fileInput.value = '';
  }
  
  function showSuccessMessage() {
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
      
      {#if imagePreview}
        <div class="image-preview">
          <img src={imagePreview} alt="Preview" />
          <button class="remove-image" on:click={removeImage}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"/>
            </svg>
          </button>
        </div>
      {/if}
      
      <div class="composer-footer">
        <div class="composer-actions">
          <input 
            type="file" 
            accept="image/*" 
            bind:this={fileInput}
            on:change={handleFileChange}
            style="display: none;"
          />
          <button class="icon-btn" on:click={handleImageSelect}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#1da1f2">
              <path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"/>
              <circle cx="8.868" cy="8.309" r="1.542"/>
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
                <span class="characters-left">
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
  
  .image-preview {
    position: relative;
    margin: 12px 0;
    border-radius: 16px;
    overflow: hidden;
    max-width: 100%;
  }
  
  .image-preview img {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 16px;
  }
  
  .remove-image {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: rgba(15, 20, 25, 0.75);
    border: none;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .remove-image:hover {
    background-color: rgba(39, 44, 48, 0.75);
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
