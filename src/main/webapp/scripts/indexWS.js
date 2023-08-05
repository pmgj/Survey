var ws;
function mostrarResultado(result) {
    if (result) {
        document.getElementById("input").style.display = "none";
        document.getElementById("output").style.display = "block";
    } else {
        document.getElementById("input").style.display = "block";
        document.getElementById("output").style.display = "none";
    }
}
function stateChanged(evt) {
    var text = evt.data;
    var votos = JSON.parse(text);
    var total = votos.reduce((a, b) => a + b, 0);
    document.getElementById("total").innerHTML = total;
    if (total !== 0) {
        var output = document.getElementById("output");
        for (var i = 0; i < votos.length; i++) {
            var voto = votos[i];
            var li = output.getElementsByTagName("li").item(i);
            var spans = li.getElementsByTagName("span");
            spans[0].innerHTML = (voto === 1) ? voto + " voto" : voto + " votos";
            var barra = li.getElementsByTagName("meter")[0];
            barra.value = (total === 0) ? 0 : (100 * voto / total);
            spans[1].innerHTML = Math.round(10000 * voto / total) / 100 + "%";
        }
    } else {
        alert("N\u00e3o h\u00e1 votos cadastrados!");
    }
}
function enviarDados(input) {
    ws.send(input.value);
    mostrarResultado(true);
}
function validar() {
    var input = document.querySelector("input[type='radio']:checked");
    if (input !== null)
        enviarDados(input);
    else
        alert("Voc\u00ea deve escolher uma op\u00e7\u00e3o!");
    return false;
}
function votarNovamente() {
    var radios = document.forms[0].disciplina;
    for (var i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }
    mostrarResultado(false);
}
function verResultado() {
    var total = parseInt(document.getElementById("total").textContent);
    if (total === 0)
        ws.send("-1");
    mostrarResultado(true);
}
function registerEvents() {
    var wsUri = "ws://" + document.location.host + document.location.pathname + "enquete";
    ws = new WebSocket(wsUri);
    ws.onmessage = stateChanged;
    var formulario = document.getElementById("formulario");
    formulario.onsubmit = validar;
    var revotar = document.getElementById("revotar");
    revotar.onclick = votarNovamente;
    var resultado = document.getElementById("resultado");
    resultado.onclick = verResultado;
}
onload = registerEvents;