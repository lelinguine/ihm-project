<script>
  import { currentUser } from '$lib/stores/tweets';
  
  let user;
  currentUser.subscribe(value => user = value);
</script>

<div class="profile">
  <div class="profile-banner"></div>
  
  <div class="profile-content">
    <div class="profile-header">
      <img src="{user.avatar}" alt="{user.display_name}" class="profile-avatar" />
    </div>
    
    <div class="profile-info">
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
  }

  .profile-avatar {
    width: 134px;
    height: 134px;
    border-radius: 50%;
    border: 4px solid white;
    background-color: white;
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
</style>
