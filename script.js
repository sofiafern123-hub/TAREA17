const apiKey = 'COPIAR_SUS_KEY';
const apiURL = ‘https://v6.exchangerate-api.com/v6/1eb1f7a56c535d15672b03bf/latest/USD’ ;

async function obtenerTasas() {
    const respuesta = await fetch(apiURL);
    const datos = await respuesta.json();
    return datos.conversion_rates;
}

document.getElementById('btnConvertir').addEventListener('click', async () => {
    const montoUSD = parseFloat(document.getElementById('monto').value);

    if (isNaN(montoUSD) || montoUSD <= 0) {
        document.getElementById('resultados').innerHTML = 
            `<p style="color:red;">Ingrese un monto válido.</p>`;
        return;
    }

    const tasas = await obtenerTasas();

    const guaranies = montoUSD * tasas.PYG;
    const argentinos = montoUSD * tasas.ARS;
    const reales = montoUSD * tasas.BRL;

    document.getElementById('resultados').innerHTML = `
        <p><strong>Resultado:</strong></p>
        <p>Guaraníes (PYG): <strong>${guaranies.toLocaleString()}</strong></p>
        <p>Peso Argentino (ARS): <strong>${argentinos.toLocaleString()}</strong></p>
        <p>Real Brasileño (BRL): <strong>${reales.toFixed(2)}</strong></p>
    `;
});
