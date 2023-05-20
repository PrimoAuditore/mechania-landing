<script>
    export let data;
    import graphic from "../../../images/graphic.svg";
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
        <h2>Esta subscripcion te proveea de:</h2>
        <div id="benefit-list">
            <div id="benefit">
                <Account />
                <span>${data.quote.labour_coverage} anuales de mano de obra especializada.</span>
            </div>
            <div id="benefit">
                <Account />
                <span>Revisiones mensuales de calidad de tu vehículo.</span>
            </div>
            <div id="benefit">
                <Account />
                <span
                    >Seguimiento de revisión técnica y permiso de circulación.</span
                >
            </div>
            <div id="benefit">
                <Account />
                <span>Retiro y entrega en tu ubicación.</span>
            </div>
        </div>
        <div id="plan-price">
            <p>Por solo:</p>
            <p><span>${data.quote.monthly_cost}</span> Mensuales + IVA</p>
            <p>En un compromiso anual de 12 pagos.</p>
        </div>
        <div id="actions">
            <Button href="/quote/{data.quote.id}/options" variant="outline">
                <GithubLogo slot="leftIcon" />
                Contratar plan
            </Button>
            <span />
            <Button href="https://wa.me/message/GUCU2536566YI1" target="_blank" variant="outline">
                <GithubLogo slot="leftIcon" />
                Realizar consultas
            </Button>
        </div>
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
