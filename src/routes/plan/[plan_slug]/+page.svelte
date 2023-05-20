<script>
    export let data;
    import graphic from "../../../images/graphic.svg";
    import { Button, Input, ActionIcon } from "@svelteuidev/core";
    import { Rocket } from "radix-icons-svelte";

    let client_name = "";
    let payment_processed = false;
    let license_plate = "";
    let vehicle_data = null;

    async function create_plan() {
        const params = new URLSearchParams({
            client_name: client_name,
            license_plate: license_plate,
            quote_id: data.quote.id,
            monthly_price: data.quote.monthly_price,
        });
        const response = await fetch("/api/plan?" + params, {
            method: "POST",
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => json)
            .catch((err) => console.error(err));

        window.open(response.plan_link, "_blank");
    }
</script>

<div class="container">
    <div class="top-bar" />
    <div class="left-block">
        <h1>Contrata Mechania para tu vehiculo.</h1>
        <img src={graphic} alt="Graphic" />
    </div>
    <div class="right-block">
        {#if !payment_processed}
            <h1>Gracias por confiar en nosotros.</h1>
            <p>
                A continuacion podras inscribir tu tarjeta de credito o debito,
                a la cual sera cargado el pago el dia 5 de cada mes. Una vez
                inscrita la tarjeta ya podras disfrutar todos los beneficios.
            </p>
            <Input
                placeholder="Ingresa tu nombre o el de tu compania."
                radius="lg"
                bind:value={client_name}
            />
            <div>
                <Input
                    placeholder="Ingresa patente de vehiculo a asegurar."
                    radius="lg"
                    bind:value={license_plate}
                />
                <ActionIcon on:click={get_vehicle_data}>
                    <Rocket />
                </ActionIcon>
                {#if vehicle_data != null}
                    <div>
                        <p>Marca: {vehicle_data.CarMake.CurrentTextValue}</p>
                        <p>Modelo: {vehicle_data.CarModel.CurrentTextValue}</p>
                        <p>Anio: {vehicle_data.RegistrationYear}</p>
                        <p>VIN: {vehicle_data.VIN}</p>
                    </div>
                {/if}
            </div>
            <Button value={client_name} on:click={create_plan} variant="outline"
                >Realizar pago.</Button
            >
        {:else}
            <h1>Felicidades</h1>
            <p>
                Si tu pago fue exitoso, recibiras un correo electronico con un
                formulario del vehiculo a asegurar, una vez enviado a nuestro
                correo podras disfrutar de todos los beneficios.
            </p>
        {/if}
    </div>
</div>

<style>
    #button-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
        margin-top: 20px;
    }

    #button-list button {
        max-width: 100px;
    }
    #loader {
        display: grid;
        justify-items: center;
        text-align: center;
    }
    svg {
        display: block;
        margin: 0 auto;
    }
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
        display: grid;
        align-items: center;
        margin-bottom: 50%;
    }

    h1 {
        width: 80%;
        margin: 20px auto;
    }

    p {
        width: 80%;
        font-size: 1.3rem;
        margin: 20px auto;
    }

    img {
        display: block;
        margin: 100px auto;
        width: 60%;
    }

    #plan-result {
    }

    #plan-result p {
        font-weight: 500;
        font-size: 2.3rem;
    }

    #plan-result .final-price span {
        color: #19ceda;
        font-size: 3.5rem;
        font-weight: 700;
    }
</style>
