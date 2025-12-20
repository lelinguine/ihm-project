<script>
  import TweetCard from './TweetCard.svelte';
  import TweetComposer from './TweetComposer.svelte';
  import { tweets } from '$lib/stores/tweets';

  let replyingToTweet = null;

  function handleReply(tweet) {
    replyingToTweet = tweet;
  }
  
  function closeReply() {
    replyingToTweet = null;
  }
</script>

<div class="feed">
  {#if replyingToTweet}
    <div class="reply-overlay" on:click={closeReply}>
      <div class="reply-modal" on:click|stopPropagation>
        <div class="original-tweet">
          <TweetCard tweet={replyingToTweet} />
        </div>
        <TweetComposer replyTo={replyingToTweet} onCancel={closeReply} />
      </div>
    </div>
  {/if}
  
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
  
  .reply-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 5vh;
    z-index: 1000;
    overflow-y: auto;
  }
  
  .reply-modal {
    background: white;
    border-radius: 16px;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .original-tweet {
    pointer-events: none;
    opacity: 0.8;
  }
</style>
