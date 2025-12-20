<script>
  import { searchUsers, toggleFollow, isFollowing } from '$lib/stores/users';
  import { currentUser } from '$lib/stores/users';
  
  export let onViewProfile;
  
  let searchQuery = '';
  let searchResults = [];
  
  // Réactivité pour la recherche
  $: if (searchQuery.trim() && $currentUser) {
    searchResults = searchUsers(searchQuery).filter(user => user.id !== $currentUser.id);
  } else {
    searchResults = [];
  }
  
  function handleFollowToggle(userId) {
    if ($currentUser) {
      toggleFollow($currentUser.id, userId);
      // Force update of search results
      searchResults = [...searchResults];
    }
  }
  
  function handleViewProfile(user) {
    if (onViewProfile) {
      onViewProfile(user);
    }
  }
</script>

<div class="search-container">
  <div class="search-box">
    <svg class="search-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"/>
    </svg>
    <input
      type="text"
      bind:value={searchQuery}
      placeholder="Rechercher des utilisateurs..."
      class="search-input"
    />
    {#if searchQuery}
      <button class="clear-btn" on:click={() => searchQuery = ''}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"/>
        </svg>
      </button>
    {/if}
  </div>
  
  {#if searchResults.length > 0}
    <div class="results-container">
      {#each searchResults as user}
        <div class="result-item">
          <div class="user-info" on:click={() => handleViewProfile(user)}>
            <img src={user.avatar} alt={user.display_name} class="result-avatar" />
            <div class="user-details">
              <div class="result-name">{user.display_name}</div>
              <div class="result-username">@{user.username}</div>
              {#if user.bio}
                <div class="result-bio">{user.bio}</div>
              {/if}
            </div>
          </div>
          <button 
            class="follow-btn-result {isFollowing($currentUser.id, user.id) ? 'following' : ''}"
            on:click={() => handleFollowToggle(user.id)}
          >
            {isFollowing($currentUser.id, user.id) ? 'Abonné' : 'Suivre'}
          </button>
        </div>
      {/each}
    </div>
  {:else if searchQuery.trim()}
    <div class="no-results">
      <p>Aucun utilisateur trouvé pour "{searchQuery}"</p>
    </div>
  {/if}
</div>

<style>
  .search-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 16px;
  }
  
  .search-box {
    display: flex;
    align-items: center;
    background-color: #eff3f4;
    border: 1px solid transparent;
    border-radius: 9999px;
    padding: 12px 16px;
    transition: all 0.2s;
    position: relative;
  }
  
  .search-box:focus-within {
    background-color: white;
    border-color: #1da1f2;
    box-shadow: 0 0 0 1px #1da1f2;
  }
  
  .search-icon {
    color: #536471;
    margin-right: 12px;
    flex-shrink: 0;
  }
  
  .search-box:focus-within .search-icon {
    color: #1da1f2;
  }
  
  .search-input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 15px;
    outline: none;
    color: #14171a;
  }
  
  .search-input::placeholder {
    color: #536471;
  }
  
  .clear-btn {
    background: #1da1f2;
    border: none;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    padding: 0;
    transition: background-color 0.2s;
  }
  
  .clear-btn:hover {
    background-color: #1a91da;
  }
  
  .results-container {
    margin-top: 16px;
    border: 1px solid #eff3f4;
    border-radius: 16px;
    overflow: hidden;
  }
  
  .result-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #eff3f4;
    transition: background-color 0.2s;
  }
  
  .result-item:last-child {
    border-bottom: none;
  }
  
  .result-item:hover {
    background-color: #f7f9f9;
  }
  
  .user-info {
    display: flex;
    gap: 12px;
    flex: 1;
    cursor: pointer;
  }
  
  .result-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  
  .user-details {
    flex: 1;
    min-width: 0;
  }
  
  .result-name {
    font-weight: 700;
    font-size: 15px;
    color: #14171a;
    margin-bottom: 2px;
  }
  
  .result-username {
    font-size: 15px;
    color: #536471;
    margin-bottom: 4px;
  }
  
  .result-bio {
    font-size: 14px;
    color: #536471;
    margin-top: 4px;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  
  .follow-btn-result {
    padding: 8px 20px;
    background-color: #14171a;
    color: white;
    border: 1px solid transparent;
    border-radius: 9999px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;
  }
  
  .follow-btn-result:hover {
    background-color: #272c30;
  }
  
  .follow-btn-result.following {
    background-color: white;
    color: #14171a;
    border: 1px solid #cfd9de;
  }
  
  .follow-btn-result.following:hover {
    background-color: #fee;
    color: #f4212e;
    border-color: #fdc9ce;
  }
  
  .no-results {
    margin-top: 32px;
    text-align: center;
    color: #536471;
    padding: 32px 16px;
  }
  
  .no-results p {
    font-size: 15px;
    margin: 0;
  }
</style>
