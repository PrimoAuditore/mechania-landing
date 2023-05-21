<script>
    export let data;
    import graphic from "../../../../images/graphic.svg";
    import logo from "../../../../images/logo-svg.svg";
    import { Button } from "@svelteuidev/core";
</script>

<div class="container">
    <div class="top-bar">
        <img src={logo} id="logo" alt="Graphic" />
    </div>
    <div class="left-block">
        <h2>Una manera simple de cuidar tu vehiculo.</h2>
        <p id="support-text" />
        <img src={graphic} id="support-graphic" alt="Graphic" />
    </div>
    <div class="right-block">
        <div id="header">
            <h3>Gracias por confiar en nosotros.</h3>
            <p>Los pasos a realizar son los siguientes:</p>
        </div>

        <div id="follow-up">
            {#if data.plan.payment_method === 2 || data.plan.payment_method === 3}
                <span class="step">1. Inscribir tu tarjeta. </span>
                <span class="step"
                    >2. Una vez inscrito tu medio de pago, te llegara a tu
                    correo el contrato a firmar por el servicio.</span
                >
                <span class="step"
                    >3. Firma el contrato y reenvialo a la direccion a la cual
                    lo recibiste.</span
                >
                <span class="step">4. Y listo, disfruta del servicio. </span>
            {/if}
            {#if data.plan.payment_method === 0 || data.plan.payment_method === 1}
                <span class="step"
                    >1. Firma el contrato que recibirás en tu correo
                    electrónico.</span
                >
                <span class="step"
                    >2. Reenvía el contrato firmado al mismo correo.</span
                >
                <span class="step"
                    >3. Recibirás respuesta en 24-48 horas hábiles confirmando
                    la activación de tu servicio.</span
                >
            {/if}
        </div>
        <div id="actions">
            {#if data.plan.payment_link !== null}
                <Button
                    variant="outline"
                    href={data.plan.payment_link}
                    target="_blank">Inscribir medio de pago</Button
                >
            {/if}
        </div>
    </div>
</div>

<style>
    @import "../../../../global.css";
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
        grid-template-rows: 1fr 1fr 1fr;
        display: grid;
        align-items: center;
        margin-bottom: 50%;
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
        height: 80%;
        padding: 10px;
    }

    #follow-up {
        display: grid;
        height: 100%;
    }

    #actions {
        display: block;
        margin: 0 auto;
    }
</style>
