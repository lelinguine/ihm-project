<script>
  import { users, currentUser, toggleFollow, isFollowing } from '$lib/stores/users';
  
  export let isOpen = false;
  export let userIds = []; // Liste des IDs des utilisateurs à afficher
  export let title = "Abonnés"; // "Abonnés" ou "Abonnements"
  export let onClose;
  export let onViewProfile; // Callback pour voir un profil
  
  $: usersList = $users.filter(u => userIds.includes(u.id));
  
  function handleFollowToggle(userId) {
    if ($currentUser) {
      toggleFollow($currentUser.id, userId);
    }
  }
  
  function handleViewProfile(user) {
    if (onViewProfile) {
      onViewProfile(user);
      onClose();
    }
  }
  
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }
</script>

{#if isOpen}
  <div class="modal-overlay" role="dialog" aria-modal="true" tabindex="-1" on:click={handleOverlayClick} on:keydown={(e) => e.key === 'Escape' && onClose()}>
    <div class="modal">
      <div class="modal-header">
        <h2>{title}</h2>
        <button class="close-btn" on:click={onClose} aria-label="Fermer">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"/>
          </svg>
        </button>
      </div>
      
      <div class="modal-content">
        {#if usersList.length > 0}
          {#each usersList as user (user.id)}
            <div class="user-item">
              <button class="user-info" on:click={() => handleViewProfile(user)}>
                <img src={user.avatar} alt={user.display_name} class="user-avatar" />
                <div class="user-details">
                  <div class="user-name">{user.display_name}</div>
                  <div class="user-username">@{user.username}</div>
                  {#if user.bio}
                    <div class="user-bio">{user.bio}</div>
                  {/if}
                </div>
              </button>
              
              {#if user.id !== $currentUser.id}
                <button 
                  class="follow-btn {isFollowing($currentUser.id, user.id) ? 'following' : ''}"
                  on:click={() => handleFollowToggle(user.id)}
                >
                  {isFollowing($currentUser.id, user.id) ? 'Abonné' : 'Suivre'}
                </button>
              {/if}
            </div>
          {/each}
        {:else}
          <div class="empty-state">
            <p>Aucun utilisateur à afficher</p>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal {
    background: white;
    border-radius: 16px;
    width: 90%;
    max-width: 600px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
  
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid #eff3f4;
  }
  
  .modal-header h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 800;
    color: #14171a;
  }
  
  .close-btn {
    background: none;
    border: none;
    color: #14171a;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
  }
  
  .close-btn:hover {
    background-color: #f7f9f9;
  }
  
  .modal-content {
    overflow-y: auto;
    padding: 0;
  }
  
  .user-item {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    border-bottom: 1px solid #eff3f4;
    transition: background-color 0.2s;
  }
  
  .user-item:hover {
    background-color: #f7f9f9;
  }
  
  .user-item:last-child {
    border-bottom: none;
  }
  
  .user-info {
    display: flex;
    gap: 12px;
    flex: 1;
    background: none;
    border: none;
    padding: 0;
    text-align: left;
    cursor: pointer;
    font: inherit;
  }

  .user-info:focus {
    outline: 2px solid #1da1f2;
    outline-offset: -2px;
  }
  
  .user-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  
  .user-details {
    flex: 1;
    min-width: 0;
  }
  
  .user-name {
    font-weight: 700;
    font-size: 15px;
    color: #14171a;
  }
  
  .user-username {
    font-size: 15px;
    color: #536471;
    margin-top: 2px;
  }
  
  .user-bio {
    font-size: 14px;
    color: #536471;
    margin-top: 4px;
    line-height: 1.4;
  }
  
  .follow-btn {
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
  
  .follow-btn:hover {
    background-color: #272c30;
  }
  
  .follow-btn.following {
    background-color: white;
    color: #14171a;
    border: 1px solid #cfd9de;
  }
  
  .follow-btn.following:hover {
    background-color: #fee;
    color: #f4212e;
    border-color: #fdc9ce;
  }
  
  .empty-state {
    padding: 40px 20px;
    text-align: center;
    color: #536471;
  }
  
  .empty-state p {
    margin: 0;
    font-size: 15px;
  }
</style>
