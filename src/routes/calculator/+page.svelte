<script>
    import consumers from "stream/consumers";
    import graphic from "../../images/graphic.svg";
    import {
        NativeSelect,
        NumberInput,
        Button,
        Loader,
    } from "@svelteuidev/core";

    const label_style = {
        fontSize: "30px",
    };

    let vehicle_type = "Hatchback";
    let vehicle_year = "2023";
    let fuel_expense = 30000;
    let plan = null;

    let loading = false;

    async function get_monthly_payment() {
        //fetch query params
        const params = new URLSearchParams({
            vehicle_type,
            vehicle_year,
            fuel_expense,
        });
        const response = await fetch("/api/calculator?" + params);
        plan = await response.json();
    }

    function hireService() {
        // redirect to /plan/hire.

        window.location.href = "/plan/" + plan.id;
    }
</script>

<div class="container">
    <div class="top-bar" />
    <div class="left-block">
        <h1>Calcula el valor de tu pago mensual</h1>
        <p>Ingresa el valor mensual promedio de tu gasto en combustible</p>
        <img src={graphic} alt="Graphic" />
    </div>
    <div class="right-block">
        {#if plan == null && !loading}
            <NativeSelect
                override={label_style}
                bind:value={vehicle_type}
                data={[
                    "CityCar",
                    "Hatchback",
                    "SUV",
                    "Pickup",
                    "Vehiculo de carga",
                ]}
                placeholder="Selecciona el tipo de vehiculo."
                label="Tengo un vehiculo tipo"
            />

            <NativeSelect
                override={label_style}
                bind:value={vehicle_year}
                data={[
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
                ]}
                placeholder="Selecciona el anio de fabricacion de tu vehiculo."
                label="del anio"
            />

            <NumberInput
                label="y gasto mensualmente en combustible"
                defaultValue={30000}
                value={fuel_expense}
                parser={(value) => value.replace(/$s?|(,*)/g, "")}
                formatter={(value) =>
                    !Number.isNaN(parseFloat(value))
                        ? ("$ " + value).replace(/B(?=(d{3})+(?!d))/g, ",")
                        : "$ "}
            />

            <Button on:click={get_monthly_payment} variant="outline"
                >Calcular costo mensual</Button
            >
        {:else if plan != null && !loading}
            <div id="plan-result">
                <p>Por solo</p>
                <p class="final-price">
                    <span>{plan.monthly_price}</span> al mes
                </p>
                <p>podras hacer de tu auto tu mejor inversion.</p>

                <div id="button-list">
                    <Button on:click={hireService} variant="outline"
                        >Contratar servicio</Button
                    >
                    <Button variant="outline">Realizar consultas</Button>
                </div>
            </div>
        {:else if loading}
            <div id="loader">
                <Loader
                    style="display:block; margin: 0 auto"
                    id="loader"
                    variant="bars"
                />
                <p>Espere un momento.</p>
            </div>
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
