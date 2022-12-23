<script lang="ts">
	  import { each } from "svelte/internal"
    import {onDestroy} from "svelte"
    import { semiTones } from "./store";

    import { transpose_local } from "./music";
    export let data : any

    let song = data.content.split("\n")
    $: lyrics = song

    let tonesCount : number
    let unsubscribe = semiTones.subscribe(value => tonesCount = value)

    $: test2 = transpose_local(tonesCount, data.content)
    onDestroy(unsubscribe)
</script>

<!-- <pre>{test1}</pre> -->
{#each test2 as line}
  <pre>{line}</pre>
{/each}
