<script>
    export let data;
    import graphic from "../../../../images/graphic.svg";
    import Account from "svelte-material-icons/Account.svelte";
    import { Button } from "@svelteuidev/core";
    import { GithubLogo } from "radix-icons-svelte";
</script>

<div class="container">
    <div class="top-bar" />
    <div class="left-block">
        <h1>Contrata Mechania para tu vehiculo.</h1>
        <img src={graphic} alt="Graphic" />
    </div>
    <div class="right-block">
        <h2>Gracias por confiar en nosotros.</h2>
        <p>Los pasos a realizar son los siguientes:</p>
    </div>
</div>

<style>
    .container {
        display: grid;
        grid-template-rows: 10% 90%;
        grid-template-columns: 1fr 1fr;
        height: 100vh;
    }

    .top-bar {
        grid-row: 1;
        grid-column: 1 / span 2;
    }

    .left-block {
        grid-row: 2;
        grid-column: 1;
    }

    .right-block {
        grid-row: 2;
        grid-column: 2;
        grid-template-rows: 1fr 3fr 1fr 1fr;
        display: grid;
        align-items: center;
        margin-bottom: 50%;
    }

    #benefit-list {
        display: grid;
        align-content: space-evenly;
    }

    #actions {
        display: grid;
        grid-template-columns: 5fr 1fr 5fr;
    }

    #actions button {
        width: 70%;
    }
</style>
