<script>
  import { onMount } from 'svelte'
  import { Bus, TEXT_MESSAGE } from '@mfr/core'

  import css from './styles.scss'

  export let name

  let count = 0

  const handleCount = () => {
    count += 1
  }

  const handleChange = (evt) => {
    Bus.emit(TEXT_MESSAGE, { text: evt.target.value })
  }

  onMount(() => {
    console.log('hello!')
  })
</script>

<header class={css['root']}>
  Hello {name}, This is Svelte app <button on:click={handleCount}>{count}</button>
  <input on:change={handleChange} on:input={handleChange} type="text" />
</header>
