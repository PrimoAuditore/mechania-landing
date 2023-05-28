<script>
    import {
        add_location,
        handle_promise,
        null_to_empty,
    } from "svelte/internal";
    import graphic from "../../images/graphic.svg";
    import logo from "../../images/logo-svg.svg";
    import {
        InputWrapper,
        Input,
        NumberInput,
        Button,
        Loader,
        NativeSelect,
    } from "@svelteuidev/core";
    let errors = {
        license_plate_error: "",
        email_error: "",
    };
    let vehicle = null;
    let manual_vehicle_creation = false;
    let vehicle_types = ["test"];

    let user_data = {
        license_plate: "",
        email: "",
        fuel_consumption: 5000,
        client_name: "",
    };
    let btn_allow_quote = false;
    let btn_loading = false;
    let button_style = {
        display: "block",
        margin: "0 auto",
        border: "1px solid #19CEDA",
        color: "#19CEDA",
    };

    function upper_func() {
        user_data.license_plate = user_data.license_plate.toUpperCase();
    }

    function allow_quote() {
        btn_allow_quote =
            errors.email_error === "" &&
            errors.license_plate_error === "" &&
            user_data.license_plate !== "" &&
            user_data.client_name !== "";
    }

    async function get_quote() {
        btn_loading = true;

        if (manual_vehicle_creation) {
            let rs = await fetch("/api/vehicle/manual", {
                method: "POST",
                body: JSON.stringify({
                    ...vehicle,
                    license_plate: user_data.license_plate,
                }),
            });

            if (!rs.ok) {
                throw new Error(rs.statusText);
            }
        }

        let rs = await fetch("/api/quote", {
            method: "POST",
            body: JSON.stringify(user_data),
        });

        let quote = await rs.json();
        btn_loading = false;
        window.location.href = "/quote/" + quote.id;
    }
    async function get_vehicle_data() {
        var regex = /^[A-Z]{2}[A-Z0-9]{2}\d{2}(\d{2})?$/;

        let match = regex.test(user_data.license_plate);

        if (match) {
            errors.license_plate_error = "";

            const params = new URLSearchParams({
                license_plate: user_data.license_plate,
            });

            // Get vehicle data
            const rs = await fetch("/api/vehicle?" + params);
            console.log(rs);

            if (rs.status !== 200 && rs.status !== 201) {
                // If lookup fail, get vehicle types needed for manual vehicle creation
                const rs = await fetch("/api/vehicle-type?" + params);
                vehicle_types = await rs.json();
                vehicle = {
                    make: "",
                    model: "",
                    year: "",
                    vehicle_type: "",
                };
                manual_vehicle_creation = true;
            } else {
                vehicle = await rs.json();
            }
        } else {
            errors.license_plate_error = "Ingrese una patente valida;";
        }
        allow_quote();
    }
    async function check_valid_email() {
        var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        let match = regex.test(user_data.email);

        if (match) {
            errors.email_error = "";
        } else {
            errors.email_error = "Ingrese una correo electronico valido.";
        }
        console.log("aaaa");
        allow_quote();
    }
</script>

<div class="container">
    <div class="top-bar">
        <img src={logo} id="logo" alt="Graphic" />
    </div>
    <div class="left-block">
        <h2>Calcula el valor de tu pago mensual</h2>
        <p>
            Ingresa el valor mensual promedio de tu gasto en combustible, el
            anio de tu vehiculo y el tipo de vehiculo.
        </p>
        <img src={graphic} id="support-graphic" alt="Graphic" />
    </div>
    <div class="right-block">
        <InputWrapper
            id="client_name"
            label="Nombre / Razon social*"
            description="Ingrese el nombre del titular del vehiculo."
        >
            <Input bind:value={user_data.client_name} />
        </InputWrapper>
        <InputWrapper
            id="client_email"
            label="Correo electronico*"
            description="Ingrese el correo electronico donde desee recibir informacion y notificaciones del producto."
            error={errors.email_error}
        >
            <Input on:blur={check_valid_email} bind:value={user_data.email} />
        </InputWrapper>
        <InputWrapper
            id="license_plate"
            label="Patente de vehiculo*"
            description="Ingrese la patente del vehiculo que desea asegurar."
            error={errors.license_plate_error}
        >
            <Input
                on:blur={get_vehicle_data}
                on:keyup={upper_func}
                bind:value={user_data.license_plate}
            />
        </InputWrapper>
        {#if vehicle !== null && manual_vehicle_creation === false}
            <h3>
                Tu vehiculo es: {vehicle.make +
                    " " +
                    vehicle.model +
                    " " +
                    vehicle.year}
            </h3>
        {/if}

        {#if manual_vehicle_creation === true}
            <div id="vehicle-form">
                <InputWrapper id="vehicle_make" label="Marca del vehiculo">
                    <Input bind:value={vehicle.make} />
                </InputWrapper>
                <InputWrapper id="vehicle_model" label="Modelo del vehiculo">
                    <Input bind:value={vehicle.model} />
                </InputWrapper>

                <NativeSelect
                    bind:value={vehicle.year}
                    data={[
                        "2024",
                        "2023",
                        "2022",
                        "2021",
                        "2020",
                        "2019",
                        "2018",
                        "2017",
                        "2016",
                        "2015",
                        "2014",
                        "2013",
                        "2012",
                        "2011",
                        "2010",
                        "2009",
                        "2008",
                        "2007",
                        "2006",
                        "2005",
                        "2004",
                        "2003",
                        "2002",
                        "2001",
                        "2000",
                        "1999",
                        "1998",
                        "1997",
                        "1996",
                        "1995",
                        "1994",
                        "1993",
                        "1992",
                        "1991",
                        "1990",
                        "1989",
                        "1988",
                        "1987",
                        "1986",
                        "1985",
                        "1984",
                        "1983",
                        "1982",
                        "1981",
                        "1980",
                    ]}
                    label="Anio"
                />
                <NativeSelect
                    bind:value={vehicle.vehicle_type}
                    data={vehicle_types}
                    label="Tipo de vehiculo"
                />
            </div>
        {/if}
        <InputWrapper
            id="fuel_consumption"
            label="Consumo de combustible*"
            description="Ingrese un estimado de lo que gasta mensualmente en combustible en el vehiculo"
        >
            <NumberInput
                defaultValue={10000}
                parser={(value) => value.replace(/\$|,/g, "")}
                bind:value={user_data.fuel_consumption}
                formatter={(value) =>
                    !Number.isNaN(parseFloat(value))
                        ? ("$ " + value).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : "$ "}
            />
        </InputWrapper>
        <div id="actions">
            {#if btn_loading == true}
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
                    style="margin: 50px auto;  display: block;"
                    id="button"
                    override={button_style}
                    loading={btn_loading}
                    disabled={!btn_allow_quote}
                    on:click={get_quote}
                    variant="outline">Calcular costo mensual</Button
                >
            {/if}
        </div>
    </div>
</div>

<style>
    @import "../../global.css";
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
        margin-top: 50px;
    }
    svg {
        display: block;
        margin: 0 auto;
    }
    #button {
        width: 70%;
    }
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
        display: grid;
        align-items: center;
        margin: 10% 0 30% 0;
        width: 80%;
    }

    h2 {
        width: 80%;
        margin: 20px auto;
    }

    p {
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

    #actions svg {
        display: block;
        margin: 0 auto;
    }

    #vehicle-form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 10px;
    }
</style>
