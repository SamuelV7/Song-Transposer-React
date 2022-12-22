<script lang="ts">
    export let songName : string
    let songLyrics : string
    $: song = songName
</script>
<div>
    <div class="container vstack">
        <div class="hstack">
            <h2>Reformation Song</h2>
        </div>
        <div class="hstack gap-4">
            <div >
                Current Chord:
            </div>
            <div>
                <button class="btn btn-dark">Transpose Up</button>
            </div>
            <div>
                <button class="btn btn-dark">Transpose Down</button>
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