<script>
    export let data;
    import graphic from "../../../../images/graphic.svg";
</script>

<div class="container">
    <div class="top-bar" />
    <div class="left-block">
        <h1>Contrata Mechania para tu vehiculo.</h1>
        <img src={graphic} alt="Graphic" />
    </div>
    <div class="right-block">
        <div id="header">
            <h2>Ups, hubo un problema</h2>
            <p>
                Puedes reintentarlo nuevamente con otro medio de pago. Si el
                problema persiste puedes escribirnos a través de WhatsApp al <a
                    href="https://wa.me/message/GUCU2536566YI1"
                    >+569 3075 7789</a
                >
                o a
                <a href="mailto:administration@pescarauto.cl"
                    >administracion@pescarauto.cl</a
                >
            </p>
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
