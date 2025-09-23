<script>
  import Router, { link } from 'svelte-spa-router';

  import Home from './views/Home.svelte';
  import About from './views/About.svelte';

  const routes = {
    '/': Home,
    '/about': About,
  };
</script>

<main>
  <!-- Navigation -->
  <nav class="p-4 bg-gray-100 border-b">
    <ul class="flex space-x-4">
      <li>
        <a href="/" use:link class="text-blue-600 hover:text-blue-800">Accueil</a>
      </li>
      <li>
        <a href="/about" use:link class="text-blue-600 hover:text-blue-800">À propos</a>
      </li>
    </ul>
  </nav>

  <!-- Contenu des pages -->
  <div class="p-4">
    <Router {routes}/>
  </div>
</main>