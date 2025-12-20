<script>
  import TweetComposer from '$lib/components/TweetComposer.svelte';
  import Feed from '$lib/components/Feed.svelte';
  import UserProfile from '$lib/components/UserProfile.svelte';
  import { currentUser } from '$lib/stores/users';
  
  let currentView = 'feed'; // 'feed' ou 'profile'
  let user;
  currentUser.subscribe(value => user = value);
  
  function showFeed() {
    currentView = 'feed';
  }
  
  function showProfile() {
    currentView = 'profile';
  }
</script>

<div class="app">
  <header class="header">
    <h1>Fil d'actualité</h1>
    <nav class="nav">
      <button 
        class="nav-btn" 
        class:active={currentView === 'feed'}
        on:click={showFeed}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M22.58 7.35L12.475 1.897c-.297-.156-.654-.156-.95 0L1.425 7.35c-.486.264-.667.87-.405 1.356.18.335.525.525.88.525.16 0 .324-.038.475-.12l.734-.396 1.59 11.25c.216 1.214 1.31 2.062 2.66 2.062h9.282c1.35 0 2.444-.848 2.662-2.088l1.588-11.225.737.398c.485.263 1.092.082 1.354-.404.263-.486.08-1.093-.404-1.355zM12 15.435c-1.795 0-3.25-1.455-3.25-3.25s1.455-3.25 3.25-3.25 3.25 1.455 3.25 3.25-1.455 3.25-3.25 3.25z"/>
        </svg>
        Accueil
      </button>
      <button 
        class="nav-btn" 
        class:active={currentView === 'profile'}
        on:click={showProfile}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.17c-.272 2.022-.008 3.46.806 4.39.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.424-.54.567-1.247.394-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z"/>
        </svg>
        Profil
      </button>
    </nav>
  </header>

  <main class="main-content">
    {#if currentView === 'feed'}
      <TweetComposer />
      <Feed />
    {:else if currentView === 'profile'}
      <UserProfile />
    {/if}
  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background-color: #fff;
  }

  .app {
    min-height: 100vh;
  }

  .header {
    position: sticky;
    top: 0;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid #e1e8ed;
    padding: 16px;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 600px;
    margin: 0 auto;
  }

  .header h1 {
    margin: 0;
    font-size: 20px;
    font-weight: 800;
  }

  .nav {
    display: flex;
    gap: 8px;
  }

  .nav-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: none;
    background: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    color: #657786;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background-color: rgba(29, 161, 242, 0.1);
    color: #1da1f2;
  }

  .nav-btn.active {
    color: #1da1f2;
    font-weight: 700;
  }

  .main-content {
    max-width: 600px;
    margin: 0 auto;
  }
</style>
