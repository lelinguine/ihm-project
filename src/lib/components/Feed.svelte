<script>
  import TweetCard from './TweetCard.svelte';
  import { tweets } from '$lib/stores/tweets';

  let selectedTweet = null;

  function handleReply(tweet) {
    selectedTweet = tweet;
    // Ouvrir le composeur de réponse
  }
</script>

<div class="feed">
  {#each $tweets as tweet (tweet.id)}
    <TweetCard {tweet} onReply={handleReply} />
  {/each}
</div>

<style>
  .feed {
    max-width: 600px;
    margin: 0 auto;
    border-left: 1px solid #e1e8ed;
    border-right: 1px solid #e1e8ed;
  }
</style>
