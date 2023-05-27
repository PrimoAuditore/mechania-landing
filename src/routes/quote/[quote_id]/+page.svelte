<script>
    export let data;
    import graphic from "../../../images/graphic.svg";
    import logo from "../../../images/logo-svg.svg";
    import Account from "svelte-material-icons/Account.svelte";
    import Cog from "svelte-material-icons/Cog.svelte";
    import TextBox from "svelte-material-icons/TextBox.svelte";
    import CheckCircleOutline from "svelte-material-icons/CheckCircleOutline.svelte";
    import MapMarker from "svelte-material-icons/MapMarker.svelte";
    import ArrowRightBoldCircleOutline from "svelte-material-icons/ArrowRightBoldCircleOutline.svelte";
    import Whatsapp from "svelte-material-icons/Whatsapp.svelte";
    import { Button, Loader } from "@svelteuidev/core";
    import { GithubLogo } from "radix-icons-svelte";

    console.log(data);

    let button_style = {
        border: "1px solid #19CEDA",
        color: "#19CEDA",
    };
    let loading = false;
</script>

<div class="container">
    <div class="top-bar">
        <img src={logo} id="logo" alt="Graphic" />
    </div>
    <div class="left-block">
        <h2>Una manera simple de cuidar tu vehiculo.</h2>
        <p id="support-text">
            Con este plan podras confiar en nosotros para que nos encarguemos de
            tu vehiculo.
        </p>
        <img src={graphic} id="support-graphic" alt="Graphic" />
    </div>
    <div class="right-block">
        <h2>Esta subscripcion te proveera de:</h2>
        <div id="benefit-list">
            <div class="benefit">
                <Cog size="1.5em" />
                <span>
                    <span class="mechania-color price"
                        >${data.quote.labour_coverage.toLocaleString("es-CL")}
                    </span>
                    anuales de mano de obra especializada.</span
                >
            </div>
            <div class="benefit">
                <CheckCircleOutline size="1.5em" />
                <span>Revisiones mensuales de calidad de tu vehículo.</span>
            </div>
            <div class="benefit">
                <TextBox size="1.5em" />
                <span
                    >Seguimiento de revisión técnica y permiso de circulación.</span
                >
            </div>
            <div class="benefit">
                <MapMarker size="1.5em" />
                <span>Retiro y entrega en tu ubicación.</span>
            </div>
        </div>
        <div id="plan-price">
            <p>Por solo:</p>
            <p>
                <span class="mechania-color price"
                    >${data.quote.monthly_cost.toLocaleString("es-CL")}</span
                > Mensuales - IVA incluido
            </p>
            <p>En un compromiso anual de 12 pagos.</p>
        </div>
        <div id="actions">
            {#if loading == true}
                <div id="loader">
                    <Loader
                        id="loader"
                        style="display: block; margin: 50px auto"
                        variant="dots"
                        override={button_style}
                    />
                </div>
            {:else}
                <Button
                    override={button_style}
                    href="/quote/{data.quote.id}/options"
                    on:click={() => {
                        loading = true;
                    }}
                    variant="outline"
                >
                    <ArrowRightBoldCircleOutline size="1.5em" />
                    Contratar plan
                </Button>
                <span />
                <Button
                    override={button_style}
                    href="https://wa.me/message/GUCU2536566YI1"
                    target="_blank"
                    variant="outline"
                >
                    <Whatsapp size="1.5em" />
                    Realizar consultas
                </Button>
            {/if}
        </div>
    </div>
</div>

<style>
    @import "../../../global.css";
    .container {
        display: grid;
        grid-template-rows: 15% 85%;
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
        padding-top: 10%;
    }

    .right-block {
        grid-row: 2;
        grid-column: 2;
        grid-template-rows: 1fr 3fr 1fr 1fr;
        display: grid;
        align-items: center;
        margin-bottom: 30%;
    }
    h2 {
        width: 80%;
        margin: 20px auto;
    }

    #support-text {
        width: 80%;
        font-size: 1.3rem;
        margin: 20px auto;
    }
    #support-graphic {
        display: block;
        margin: 100px auto;
        width: 60%;
    }

    #logo {
        padding: 10px;
        height: 80%;
    }

    .benefit {
        display: grid;
        grid-template-columns: 1fr 15fr;
        align-items: center;
    }

    #benefit-list {
        height: 100%;
        display: grid;
        align-content: space-evenly;
    }

    #actions {
        padding: 0 10px;
        display: grid;
        grid-template-columns: 5fr 1fr 5fr;
    }

    #actions button {
        width: 70%;
    }

    .price {
        font-weight: 600;
    }
    #loader {
        display: grid;
        justify-items: center;
        text-align: center;
        margin-top: 50px;
    }
</style>
