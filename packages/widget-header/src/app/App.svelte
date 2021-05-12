<script>
  import { onMount } from 'svelte'

  import css from './styles.scss'

  export let name

  let count = 0

  const handleCount = () => {
    count += 1
  }

  onMount(() => {
    console.log('hello!')
  })
</script>

<header class={css['root']}>
  Hello {name}, from Header <button on:click={handleCount}>{count}</button>
</header>
