<script lang="ts">
    import { semiTones, songName } from "./store";
    import { onDestroy } from "svelte";

    function increament(){
        semiTones.update(n => n + 1)
    }
    function decremeant(){
        semiTones.update(n => n - 1)
    }
    let displaySemiTones: number
    let title: string
    let unsubscribe = semiTones.subscribe(value => {displaySemiTones = value})
    let unsubscribe_title = songName.subscribe(value => {title = value})

    onDestroy(unsubscribe)
    onDestroy(unsubscribe_title)
</script>

<div>
    <div class="container vstack">
        <div class="hstack">
            <h2>{title}</h2>
        </div>
        <div class="hstack gap-4">
            <div >
                Current Chord: 
            </div>
            <div>
                <button class="btn btn-dark" on:click={decremeant}>-</button>
            </div>
                {#if displaySemiTones > 0}
                    <div>
                        Transpose +{displaySemiTones}
                    </div>
                {:else}
                    <div>
                        Transpose { displaySemiTones}
                    </div>
                {/if}
            <div>
                <button class="btn btn-dark" on:click={increament}>+</button>
            </div>
        </div>
        <slot></slot>
    </div>
</div>



<!-- <style lang="scss">
    // div{
    //     border: red dotted;
    // }
</style> -->