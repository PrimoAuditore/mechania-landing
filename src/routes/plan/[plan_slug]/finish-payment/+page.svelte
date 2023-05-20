<script>
    export let data;
    import graphic from "../../../../images/graphic.svg";
    import { Button } from "@svelteuidev/core";
</script>

<div class="container">
    <div class="top-bar" />
    <div class="left-block">
        <h1>Contrata Mechania para tu vehiculo.</h1>
        <img src={graphic} alt="Graphic" />
    </div>
    <div class="right-block">
        <div id="header">
            <h2>Gracias por confiar en nosotros.</h2>
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
                    >2. Reenvía el mismo firmado al mismo correo.</span
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
        grid-template-rows: 1fr 1fr 1fr;
        display: grid;
        align-items: center;
        margin-bottom: 50%;
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
