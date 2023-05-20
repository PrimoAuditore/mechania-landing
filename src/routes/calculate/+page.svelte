<script>
    import { handle_promise } from "svelte/internal";
    import graphic from "../../images/graphic.svg";
    import {
        InputWrapper,
        Input,
        NumberInput,
        Button,
    } from "@svelteuidev/core";
    import { writable } from "svelte/store";
    import { error } from "@sveltejs/kit";
    let errors = {
        license_plate_error: "",
        email_error: "",
    };
    let license_plate = "";
    let vehicle = null;
    let user_data = {
        license_plate: "",
        email: "",
        fuel_consumption: 5000,
        client_name: "",
    };
    let btn_allow_quote = false;
    let btn_loading = false;

    function allow_quote() {
        console.log(btn_allow_quote);
        btn_allow_quote =
            errors.email_error !== "" || errors.license_plate_error !== "";
    }

    async function get_quote() {
         btn_loading = true;
        let rs = await fetch("/api/quote", {
            method: "POST",
            body: JSON.stringify(user_data),
        });

        let quote = await rs.json();
        btn_loading = false;
        window.location.href = "/quote/" + quote.id;
    }
    async function handleBlur() {
        allow_quote();
        var regex = /^[A-Z]{2}[A-Z0-9]{2}\d{2}(\d{2})?$/;

        let match = regex.test(user_data.license_plate);

        if (match) {
            errors.license_plate_error = "";

            const params = new URLSearchParams({
                license_plate: user_data.license_plate,
            });

            // Get vehicle data
            const rs = await fetch("/api/vehicle?" + params);
            vehicle = await rs.json();
        } else {
            errors.license_plate_error = "Ingrese una patente valida;";
        }
    }
    async function check_valid_email() {
        allow_quote();
        var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        let match = regex.test(user_data.email);

        if (match) {
            errors.email_error = "";
        } else {
            errors.email_error = "Ingrese una correo electronico valido.";
        }
    }
</script>

<div class="container">
    <div class="top-bar" />
    <div class="left-block">
        <h1>Calcula el valor de tu pago mensual</h1>
        <p>
            Ingresa el valor mensual promedio de tu gasto en combustible, el
            anio de tu vehiculo y el tipo de vehiculo.
        </p>
        <img src={graphic} alt="Graphic" />
    </div>
    <div class="right-block">
        <InputWrapper
            id="client_name"
            label="Nombre / Razon social"
            description="Ingrese el nombre del titular del vehiculo."
        >
            <Input bind:value={user_data.client_name} />
        </InputWrapper>
        <InputWrapper
            id="client_email"
            label="Correo electronico"
            description="Ingrese el correo electronico donde desee recibir informacion y notificaciones del producto."
            error={errors.email_error}
        >
            <Input on:blur={check_valid_email} bind:value={user_data.email} />
        </InputWrapper>
        <InputWrapper
            id="license_plate"
            label="Patente de vehiculo"
            description="Ingrese la patente del vehiculo que desea asegurar."
            error={errors.license_plate_error}
        >
            <Input on:blur={handleBlur} bind:value={user_data.license_plate} />
        </InputWrapper>
        {#if vehicle !== null}
            <h3>
                Tu vehiculo es: {vehicle.make +
                    " " +
                    vehicle.model +
                    " " +
                    vehicle.year}
            </h3>
        {/if}
        <InputWrapper
            id="fuel_consumption"
            label="Consumo de combustible"
            description="Ingrese un estimado de lo que gasta mensualmente en combustible en el vehiculo"
        >
            <NumberInput
                hideControls
                defaultValue={5000}
                parser={(value) => {
                    console.log(value.split("$"));
                    user_data.fuel_consumption = parseFloat(
                        value.split("$")[1].trim()
                    );
                    value.replace(/$s?|(,*)/g, "");
                }}
                min={5000}
                formatter={(value) =>
                    !Number.isNaN(parseFloat(value))
                        ? ("$ " + value).replace(/B(?=(d{3})+(?!d))/g, ",")
                        : "$ "}
            />
        </InputWrapper>
        <Button loading={btn_loading} disabled={btn_allow_quote} on:click={get_quote} variant="light"
            >Calcular costo mensual</Button
        >
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
        margin: 10% 0 30% 0;
        width: 80%;
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
