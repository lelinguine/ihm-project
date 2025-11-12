<script>
  import TweetComposer from '$lib/components/TweetComposer.svelte';
  import Feed from '$lib/components/Feed.svelte';
</script>

<div class="app">
  <header class="header">
    <h1>Fil d'actualité</h1>
  </header>

  <main class="main-content">
    <TweetComposer />
    <Feed />
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
  }

  .header h1 {
    margin: 0;
    font-size: 20px;
    font-weight: 800;
  }

  .main-content {
    max-width: 600px;
    margin: 0 auto;
  }
</style>
