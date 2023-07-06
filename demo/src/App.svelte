<script>
  import X6Container from "./lib/X6Container.svelte";

  function layout() {
    x6Container.layout()
  }

  let x6Container
</script>

<main>
  <div class="tools">
    <button on:click={layout}>自动布局</button>
  </div>
  <X6Container bind:this={x6Container}/>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
  }

  main .tools {
    margin: 10px;
  }

  main .tools button {
    /*background-color: beige;*/
  }

  main .tools button:focus {
    outline: none;
  }
</style>
