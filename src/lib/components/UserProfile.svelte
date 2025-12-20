<script>
  import { currentUser } from '$lib/stores/users';
  import { viewedUser, updateCurrentUserProfile, viewOwnProfile, toggleFollow, isFollowing, followings, users, viewUserProfile } from '$lib/stores/users';
  import { tweets } from '$lib/stores/tweets';
  import TweetCard from './TweetCard.svelte';
    import FollowersModal from './FollowersModal.svelte';
  
  let user = $viewedUser;
  let isOwnProfile = true;
  let userTweets = [];
  let currentUserId = $currentUser.id;
  let isUserFollowing = false;
  
  // Mise à jour réactive de tous les changements
  $: if ($currentUser && $viewedUser && $followings && $users) {
    currentUserId = $currentUser.id;
    user = $viewedUser;
    isOwnProfile = $currentUser.id === $viewedUser.id;
    isUserFollowing = isFollowing($currentUser.id, $viewedUser.id);
    
    // Recharger les données actualisées du viewedUser
    const updatedUser = $users.find(u => u.id === $viewedUser.id);
    if (updatedUser) {
      user = updatedUser;
    }
  }
  
  // Filtrer les tweets de l'utilisateur (incluant les retweets)
  $: if (user && $tweets) {
    userTweets = $tweets.filter(tweet => tweet.author_id === user.id);
  }
  
  let isEditing = false;
  let editForm = {
    display_name: '',
    username: '',
    bio: '',
  };
  
  function handleFollowToggle() {
    if (currentUserId && user && user.id) {
      toggleFollow(currentUserId, user.id);
      // Mettre à jour la réactivité
      isUserFollowing = isFollowing(currentUserId, user.id);
    }
  }
  
  function startEditing() {
    isEditing = true;
    editForm = {
      display_name: user.display_name || '',
      username: user.username || '',
      bio: user.bio || '',
    };
  }
  
  function cancelEditing() {
    isEditing = false;
  }
  
  function saveProfile() {
    if (!editForm.display_name.trim() || !editForm.username.trim()) {
      alert('Le nom et le pseudo sont obligatoires');
      return;
    }
    
    updateCurrentUserProfile({
      id: user.id,
      display_name: editForm.display_name.trim(),
      username: editForm.username.trim(),
      bio: editForm.bio.trim(),
    });
    
    isEditing = false;
  }
  
  function goBack() {
    viewOwnProfile();
  }

  // État du modal (au niveau du composant)
  let showFollowersModal = false;
  let showFollowingModal = false;
  let modalFollowerIds = [];
  let modalFollowingIds = [];

  // Mettre à jour les listes pour les modals
  $: if ($followings && user) {
    modalFollowerIds = Object.keys($followings)
      .filter(id => $followings[id]?.includes(user.id))
      .map(id => parseInt(id));

    modalFollowingIds = $followings[user.id] || [];
  }

  function openFollowersModal() {
    showFollowersModal = true;
  }

  function openFollowingModal() {
    showFollowingModal = true;
  }

  function closeModals() {
    showFollowersModal = false;
    showFollowingModal = false;
  }

  function handleViewProfile(user) {
    viewUserProfile(user.id);
  }
</script>

<div class="profile">
  <div class="profile-banner"></div>
  
  <div class="profile-content">
    <div class="profile-header">
      <div class="header-top">
        <img src="{user.avatar}" alt="{user.display_name}" class="profile-avatar" />
        {#if isOwnProfile && !isEditing}
          <button class="edit-btn" on:click={startEditing}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M3 12.001h10.39L9.702 6.662c-.366-.366-.366-.952 0-1.318.366-.366.952-.366 1.318 0l6.36 6.36c.366.366.366.952 0 1.318l-6.36 6.36c-.366.366-.952.366-1.318 0-.366-.366-.366-.952 0-1.318l3.688-3.688H3c-.517 0-.932-.415-.932-.932s.415-.932.932-.932z"/>
            </svg>
            Modifier le profil
          </button>
        {/if}
        {#if !isOwnProfile}
          <div class="profile-actions-group">
            <button class="back-btn" on:click={goBack}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 3l-9 9 9 9 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
              Retour
            </button>
            <button class="follow-btn {isUserFollowing ? 'following' : ''}" on:click={handleFollowToggle}>
              {isUserFollowing ? 'Ne plus suivre' : 'Suivre'}
            </button>
          </div>
        {/if}
      </div>
    </div>
    
    <div class="profile-info">
      {#if isEditing}
        <div class="edit-form">
          <div class="form-group">
            <label for="display-name">Nom</label>
            <input 
              id="display-name"
              type="text" 
              bind:value={editForm.display_name}
              placeholder="Votre nom complet"
              maxlength="50"
            />
          </div>
          
          <div class="form-group">
            <label for="username">Pseudo (@)</label>
            <div class="username-input-wrapper">
              <span class="at-symbol">@</span>
              <input 
                id="username"
                type="text" 
                bind:value={editForm.username}
                placeholder="username"
                maxlength="30"
              />
            </div>
          </div>
          
          <div class="form-group">
            <label for="bio">Bio</label>
            <textarea 
              id="bio"
              bind:value={editForm.bio}
              placeholder="Dites-nous en plus sur vous"
              maxlength="160"
              rows="3"
            ></textarea>
            <span class="char-count">{editForm.bio.length}/160</span>
          </div>
          
          <div class="form-actions">
            <button class="cancel-btn" on:click={cancelEditing}>Annuler</button>
            <button class="save-btn" on:click={saveProfile}>Enregistrer</button>
          </div>
        </div>
      {:else}
        <h1 class="profile-name">{user.display_name}</h1>
        <span class="profile-username">@{user.username}</span>
        
        {#if user.bio}
          <p class="profile-bio">{user.bio}</p>
        {/if}
        
        <div class="profile-meta">
          <span class="meta-item">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"/>
              <circle cx="7.032" cy="8.75" r="1.285"/>
              <circle cx="7.032" cy="13.156" r="1.285"/>
              <circle cx="16.968" cy="8.75" r="1.285"/>
              <circle cx="16.968" cy="13.156" r="1.285"/>
              <circle cx="12" cy="8.75" r="1.285"/>
              <circle cx="12" cy="13.156" r="1.285"/>
              <circle cx="7.032" cy="17.486" r="1.285"/>
              <circle cx="12" cy="17.486" r="1.285"/>
            </svg>
            A rejoint en {user.joined_date}
          </span>
        </div>
        
        <div class="profile-stats">
          <div class="stat">
            <button class="stat-value-btn" on:click={openFollowingModal} aria-label="Voir les abonnements">{user.following_count}</button>
            <span class="stat-label">Abonnements</span>
          </div>
          <div class="stat">
            <button class="stat-value-btn" on:click={openFollowersModal} aria-label="Voir les abonnés">{user.followers_count}</button>
            <span class="stat-label">Abonnés</span>
          </div>
          <div class="stat">
            <span class="stat-value">{user.tweets_count}</span>
            <span class="stat-label">Tweets</span>
          </div>
        </div>
        
        {#if userTweets.length > 0}
          <div class="tweets-section">
            <h2 class="tweets-title">Tweets de {user.display_name}</h2>
            <div class="user-tweets">
              {#each userTweets as tweet (tweet.id)}
                <TweetCard {tweet} />
              {/each}
            </div>
          </div>
        {:else}
          <div class="no-tweets">
            <p>Aucun tweet pour le moment</p>
          </div>
        {/if}
      {/if}
    </div>
  </div>
</div>

<!-- Modals -->
<FollowersModal 
  isOpen={showFollowersModal}
  userIds={modalFollowerIds}
  title="Abonnés"
  onClose={closeModals}
  onViewProfile={handleViewProfile}
/>

<FollowersModal 
  isOpen={showFollowingModal}
  userIds={modalFollowingIds}
  title="Abonnements"
  onClose={closeModals}
  onViewProfile={handleViewProfile}
/>

<style>
  .profile {
    max-width: 600px;
    margin: 0 auto;
    border-left: 1px solid #e1e8ed;
    border-right: 1px solid #e1e8ed;
  }

  .profile-banner {
    height: 200px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .profile-content {
    padding: 0 16px;
  }

  .profile-header {
    margin-top: -75px;
    margin-bottom: 12px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  
  .header-top {
    display: flex;
    align-items: flex-end;
    gap: 16px;
    width: 100%;
  }

  .profile-avatar {
    width: 134px;
    height: 134px;
    border-radius: 50%;
    border: 4px solid white;
    background-color: white;
    flex-shrink: 0;
  }
  
  .edit-btn {
    margin-left: auto;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background-color: white;
    border: 2px solid #1da1f2;
    color: #1da1f2;
    border-radius: 9999px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .edit-btn:hover {
    background-color: #e8f5fe;
  }
  
  .back-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background-color: white;
    border: 2px solid #1da1f2;
    color: #1da1f2;
    border-radius: 9999px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    margin-left: 8px;
  }
  
  .back-btn:hover {
    background-color: #e8f5fe;
  }
  
  .profile-actions-group {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  
  .follow-btn {
    padding: 8px 24px;
    background-color: #14171a;
    color: white;
    border: 2px solid transparent;
    border-radius: 9999px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .follow-btn:hover {
    background-color: #272c30;
  }
  
  .follow-btn.following {
    background-color: white;
    color: #14171a;
    border: 2px solid #cfd9de;
  }
  
  .follow-btn.following:hover {
    background-color: #fef0f1;
    color: #f4212e;
    border-color: #fdc9ce;
  }

  .profile-info {
    margin-bottom: 16px;
  }

  .profile-name {
    font-size: 20px;
    font-weight: 800;
    margin: 4px 0;
    color: #14171a;
  }

  .profile-username {
    font-size: 15px;
    color: #657786;
    display: block;
    margin-bottom: 12px;
  }

  .profile-bio {
    font-size: 15px;
    color: #14171a;
    line-height: 1.5;
    margin: 12px 0;
  }

  .profile-meta {
    display: flex;
    gap: 12px;
    margin: 12px 0;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 15px;
    color: #657786;
  }

  .profile-stats {
    display: flex;
    gap: 20px;
    padding: 16px 0;
    border-bottom: 1px solid #e1e8ed;
  }

  .stat {
    display: flex;
    gap: 4px;
    cursor: pointer;
  }

  .stat:hover .stat-value {
    text-decoration: underline;
  }

  .stat-value {
    font-weight: 700;
    font-size: 15px;
    color: #14171a;
  }

  .stat-value-btn {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    color: #14171a;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    transition: color 0.2s;
  }
  .stat-value-btn:hover {
    color: #1d9bf0;
    text-decoration: underline;
  }

  .stat-label {
    font-size: 15px;
    color: #657786;
  }
  
  /* Styles pour le formulaire d'édition */
  .edit-form {
    padding: 16px 0;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    font-weight: 700;
    color: #14171a;
    margin-bottom: 8px;
    font-size: 15px;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #e1e8ed;
    border-radius: 8px;
    font-family: inherit;
    font-size: 15px;
    color: #14171a;
    transition: border-color 0.2s;
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #1da1f2;
    box-shadow: 0 0 0 2px rgba(29, 161, 242, 0.1);
  }
  
  .form-group textarea {
    resize: vertical;
    min-height: 100px;
  }
  
  .username-input-wrapper {
    display: flex;
    align-items: center;
    border: 1px solid #e1e8ed;
    border-radius: 8px;
    transition: border-color 0.2s;
  }
  
  .username-input-wrapper:focus-within {
    border-color: #1da1f2;
  }
  
  .at-symbol {
    padding-left: 12px;
    color: #657786;
    font-weight: 500;
  }
  
  .username-input-wrapper input {
    border: none;
    padding: 12px 12px 12px 0;
    flex: 1;
  }
  
  .username-input-wrapper input:focus {
    outline: none;
    box-shadow: none;
  }
  
  .char-count {
    display: block;
    font-size: 13px;
    color: #657786;
    margin-top: 4px;
  }
  
  .form-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    padding-top: 12px;
    border-top: 1px solid #e1e8ed;
  }
  
  .cancel-btn,
  .save-btn {
    padding: 8px 24px;
    border: none;
    border-radius: 9999px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .cancel-btn {
    background-color: #f0f0f0;
    color: #14171a;
  }
  
  .cancel-btn:hover {
    background-color: #e0e0e0;
  }
  
  .save-btn {
    background-color: #1da1f2;
    color: white;
  }
  
  .save-btn:hover {
    background-color: #1a91da;
  }
  
  /* Styles pour les tweets de l'utilisateur */
  .tweets-section {
    padding-top: 16px;
    border-top: 1px solid #e1e8ed;
  }
  
  .tweets-title {
    font-size: 18px;
    font-weight: 800;
    color: #14171a;
    margin: 16px 0;
  }
  
  .user-tweets {
    display: flex;
    flex-direction: column;
  }
  
  .user-tweet-item {
    display: flex;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid #e1e8ed;
    transition: background-color 0.2s;
  }
  
  .user-tweet-item:hover {
    background-color: #f7f9fa;
  }
  
  .tweet-avatar-small {
    flex-shrink: 0;
  }
  
  .tweet-avatar-small img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  
  .tweet-content-small {
    flex: 1;
    min-width: 0;
  }
  
  .tweet-header-small {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 4px;
  }
  
  .tweet-name {
    font-weight: 700;
    color: #14171a;
    font-size: 14px;
  }
  
  .tweet-username {
    color: #657786;
    font-size: 14px;
  }
  
  .tweet-date {
    color: #657786;
    font-size: 13px;
    margin-left: auto;
  }
  
  .tweet-text {
    color: #14171a;
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
  }
  
  .no-tweets {
    padding: 32px 16px;
    text-align: center;
    color: #657786;
  }
</style>
