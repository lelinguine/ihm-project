<script>
  import { currentUser } from '$lib/stores/tweets';
  import { updateCurrentUserProfile } from '$lib/stores/users';
  
  let user;
  currentUser.subscribe(value => user = value);
  
  let isEditing = false;
  let editForm = {
    display_name: '',
    username: '',
    bio: '',
  };
  
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
</script>

<div class="profile">
  <div class="profile-banner"></div>
  
  <div class="profile-content">
    <div class="profile-header">
      <div class="header-top">
        <img src="{user.avatar}" alt="{user.display_name}" class="profile-avatar" />
        {#if !isEditing}
          <button class="edit-btn" on:click={startEditing}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M3 12.001h10.39L9.702 6.662c-.366-.366-.366-.952 0-1.318.366-.366.952-.366 1.318 0l6.36 6.36c.366.366.366.952 0 1.318l-6.36 6.36c-.366.366-.952.366-1.318 0-.366-.366-.366-.952 0-1.318l3.688-3.688H3c-.517 0-.932-.415-.932-.932s.415-.932.932-.932z"/>
            </svg>
            Modifier le profil
          </button>
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
            <span class="stat-value">{user.following_count}</span>
            <span class="stat-label">Abonnements</span>
          </div>
          <div class="stat">
            <span class="stat-value">{user.followers_count}</span>
            <span class="stat-label">Abonnés</span>
          </div>
          <div class="stat">
            <span class="stat-value">{user.tweets_count}</span>
            <span class="stat-label">Tweets</span>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

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
</style>
