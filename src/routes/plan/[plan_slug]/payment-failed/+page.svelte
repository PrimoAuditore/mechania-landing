<script>
    export let data;
    import graphic from "../../../../images/graphic.svg";
    import logo from "../../../../images/logo-svg.svg";
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
        <div id="header">
            <h2>Ups, hubo un problema</h2>
            <p id="help-text">
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
        height: 80%;
        margin: 10px;
    }

    #help-text {
        line-height: 40px;
        padding: 34px;
    }
</style>
