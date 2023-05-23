<script>
    export let data;
    import graphic from "../../../../images/graphic.svg";
    import logo from "../../../../images/logo-svg.svg";
    import { Button, ActionIcon, Loader } from "@svelteuidev/core";
    import { GithubLogo } from "radix-icons-svelte";
    import CreditCard from "svelte-material-icons/CreditCard.svelte";
    import Cash from "svelte-material-icons/Cash.svelte";
    import BankTransfer from "svelte-material-icons/BankTransfer.svelte";
    import Draw from "svelte-material-icons/Draw.svelte";
    import Cellphone from "svelte-material-icons/Cellphone.svelte";

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
    let button_style = {
        border: "1px solid #19CEDA",
        color: "#19CEDA",
        display: "block",
        margin: "0 auto",
    };
    let options_style = {
        color: "#19CEDA",
    };

    let payment_method = null;
    let sign_method = null;
    let creating_plan = false;

    async function hire_plan() {
        creating_plan = true;
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
        <div id="payment_method">
            <h4>Deseo realizar el pago con:</h4>
            <p>Selecciona una opción</p>
            <Button
                on:click={() => {
                    select_payment_method(0);
                }}
                color={payment_methods_colors.cash}
                size="md"
                variant="subtle"
            >
                <Cash size="1.5em" />
                <span style="margin-left: 20px;">Efectivo</span>
            </Button>
            <Button
                on:click={() => {
                    select_payment_method(1);
                }}
                color={payment_methods_colors.wire}
                size="md"
                variant="subtle"
            >
                <BankTransfer size="1.5em" />
                <span style="margin-left: 20px;">Transferencia Bancaria</span>
            </Button>
            <Button
                on:click={() => {
                    select_payment_method(3);
                }}
                color={payment_methods_colors.debit_card}
                size="md"
                variant="subtle"
            >
                <CreditCard size="1.5em" />
                <span style="margin-left: 20px;">Tarjeta de debito</span>
            </Button>
            <Button
                on:click={() => {
                    select_payment_method(2);
                }}
                color={payment_methods_colors.credit_card}
                size="md"
                variant="subtle"
            >
                <CreditCard size="1.5em" />
                <span style="margin-left: 20px;">Tarjeta de credito</span>
            </Button>
        </div>
        <div id="sign_method">
            <h4>Prefiero firmar el contrato:</h4>
            <p>Selecciona una opción</p>
            <div class="sign_option">
                <Button
                    on:click={() => {
                        select_sign_method(1);
                    }}
                    color={sign_methods_colors.digital}
                    size="md"
                    variant="subtle"
                >
                    <Cellphone size="1.5em" />
                    <span style="margin-left: 20px;">Digital</span>
                </Button>
                <p class="option_description">
                    Requiere tener clave única, se enviara link a su correo del
                    contrato una vez asociada su tarjeta.
                </p>
            </div>
            <div class="sign_option">
                <Button
                    on:click={() => {
                        select_sign_method(0);
                    }}
                    color={sign_methods_colors.deferred}
                    size="md"
                    variant="subtle"
                >
                    <Draw size="1.5em" />
                    <span style="margin-left: 20px;">En diferido</span>
                </Button>
                <p class="option_description">
                    Se enviara un correo electrónico con el contrato, el cual
                    deberá ser firmado y reenviado al mismo correo.
                </p>
            </div>
        </div>
        <div id="actions">
            {#if creating_plan == true}
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
                    disabled={creating_plan ||
                        payment_method == null ||
                        sign_method == null}
                    override={button_style}
                    variant="outline"
                    on:click={hire_plan}>Contratar Plan</Button
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
        padding-top: 10%;
    }

    .right-block {
        grid-row: 2;
        grid-column: 2;
        grid-template-rows: 1fr 3fr 1fr 1fr;
        display: grid;
        align-items: center;
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
    h2 {
        width: 80%;
        margin: 20px auto;
    }

    .payment_option,
    .option_title {
        display: grid;
        grid-template-columns: 1fr 9fr;
        align-items: center;
    }

    #actions button {
        display: block;
    }
    #loader {
        display: grid;
        justify-items: center;
        text-align: center;
        margin-top: 50px;
    }
</style>
