<script lang="ts">
    import TheNavbar from '../lib/navbar.svelte';
</script>
<svelte:head>
	  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
</svelte:head>

<TheNavbar></TheNavbar>
<h5>This is Beta</h5>
<slot></slot>