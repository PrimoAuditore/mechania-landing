<script>
    export let data;
    import graphic from "../../../../images/graphic.svg";
    import Account from "svelte-material-icons/Account.svelte";
    import { Button, ActionIcon } from "@svelteuidev/core";
    import { GithubLogo } from "radix-icons-svelte";
    import Page from "../../../+page.svelte";

    let payment_methods_colors = {
        cash: "gray",
        wire: "gray",
        credit_card: "gray",
        debit_card: "gray",
    };
    let sign_methods_colors = {
        deferred: "gray",
        digital: "gray",
    };

    let payment_method = null;
    let sign_method = null;
    let creating_plan = false;

    async function hire_plan() {
        let creating_plan = true;
        let rs = await fetch("/api/plan", {
            method: "POST",
            body: JSON.stringify({
                quote_id: data.quote.id,
                payment_method: payment_method,
                sign_method: sign_method,
            }),
        });
        let plan = await rs.json();

        window.location = "/plan/" + plan.id + "/finish-payment";
    }

    function select_sign_method(selected_method) {
        sign_method = selected_method;
        sign_methods_colors = {
            deferred: "gray",
            digital: "gray",
        };

        if (selected_method === 0) {
            sign_methods_colors.deferred = "blue";
        } else if (selected_method === 1) {
            sign_methods_colors.digital = "blue";
        }
    }
    function select_payment_method(selected_method) {
        payment_method = selected_method;
        payment_methods_colors = {
            cash: "gray",
            wire: "gray",
            credit_card: "gray",
            debit_card: "gray",
        };

        if (selected_method === 0) {
            payment_methods_colors.cash = "blue";
        } else if (selected_method === 1) {
            payment_methods_colors.wire = "blue";
        } else if (selected_method === 2) {
            payment_methods_colors.credit_card = "blue";
        } else if (selected_method === 3) {
            payment_methods_colors.debit_card = "blue";
        }
    }
</script>

<div class="container">
    <div class="top-bar" />
    <div class="left-block">
        <h1>Contrata Mechania para tu vehiculo.</h1>
        <img src={graphic} alt="Graphic" />
    </div>
    <div class="right-block">
        <div id="payment_method">
            <h2>Deseo realizar el pago con:</h2>
            <p>Selecciona una opción</p>
            <div class="payment_option">
                <ActionIcon
                    on:click={() => {
                        select_payment_method(0);
                    }}
                    color={payment_methods_colors.cash}
                >
                    <GithubLogo />
                </ActionIcon>
                <span>Efectivo</span>
            </div>
            <div class="payment_option">
                <ActionIcon
                    on:click={() => {
                        select_payment_method(1);
                    }}
                    color={payment_methods_colors.wire}
                >
                    <GithubLogo />
                </ActionIcon>
                <span>Transferencia</span>
            </div>
            <div class="payment_option">
                <ActionIcon
                    on:click={() => {
                        select_payment_method(2);
                    }}
                    color={payment_methods_colors.credit_card}
                >
                    <GithubLogo />
                </ActionIcon>
                <span>Tarjeta de Credito</span>
            </div>
            <div class="payment_option">
                <ActionIcon
                    on:click={() => {
                        select_payment_method(3);
                    }}
                    color={payment_methods_colors.debit_card}
                >
                    <GithubLogo />
                </ActionIcon>
                <span>Tarjeta de Debito</span>
            </div>
        </div>
        <div id="sign_method">
            <h2>Prefiero firmar el contrato:</h2>
            <p>Selecciona una opción</p>
            <div class="sign_option">
                <div class="option_title">
                    <ActionIcon
                        on:click={() => {
                            select_sign_method(1);
                        }}
                        color={sign_methods_colors.digital}
                    >
                        <GithubLogo />
                    </ActionIcon>
                    <span>Digital</span>
                </div>
                <p class="option_description">
                    Requiere tener clave única, se enviara link a su correo del
                    contrato una vez asociada su tarjeta.
                </p>
            </div>
            <div class="sign_option">
                <div class="option_title">
                    <ActionIcon
                        on:click={() => {
                            select_sign_method(0);
                        }}
                        color={sign_methods_colors.deferred}
                    >
                        <GithubLogo />
                    </ActionIcon>
                    <span>En diferido</span>
                </div>
                <p class="option_description">
                    Se enviara correo electrónico con el contrato, el cual
                    deberá ser firmado y reenviado al mismo correo.
                </p>
            </div>
        </div>
        <div id="actions">
            <Button disabled={creating_plan} variant="outline" on:click={hire_plan}
                >Contratar Plan</Button
            >
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

    .payment_option,
    .option_title {
        display: grid;
        grid-template-columns: 1fr 9fr;
    }
</style>
