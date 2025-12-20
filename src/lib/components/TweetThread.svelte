<script>
  import TweetCard from './TweetCard.svelte';
  import TweetComposer from './TweetComposer.svelte';
  import { tweets } from '$lib/stores/tweets';
  
  export let mainTweet;
  export let onReply;
  
  $: replies = $tweets.filter(tweet => tweet.reply_to_id === mainTweet.id);
</script>

<div class="tweet-thread">
  <TweetCard tweet={mainTweet} {onReply} />
  
  {#if replies.length > 0}
    <div class="replies">
      {#each replies as reply (reply.id)}
        <div class="reply-item">
          <div class="reply-line"></div>
          <TweetCard tweet={reply} {onReply} />
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .tweet-thread {
    position: relative;
  }
  
  .replies {
    border-left: 2px solid #e1e8ed;
    margin-left: 24px;
  }
  
  .reply-item {
    position: relative;
  }
  
  .reply-line {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: #e1e8ed;
  }
</style>
