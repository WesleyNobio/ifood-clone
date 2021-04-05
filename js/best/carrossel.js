var bc_card = document.querySelector('.best_card');
var tamanho_deslocamento = (bc_card.offsetWidth + 10);
var contador = 0;
var inicio = -(tamanho_deslocamento * 5);
var limiti_direita = -(tamanho_deslocamento * 10);
var ativo = false;
var limiti_esquerda = 0;

function atualiza_posicao() {
    bc_card = document.querySelector('.best_card');
    tamanho_deslocamento = (bc_card.offsetWidth + 10);
    inicio = -(tamanho_deslocamento * 5);
    limiti_direita = -(tamanho_deslocamento * 10);
}

function variacao_deslocamento(a){
    var b_c = document.querySelector('.best_carrossel')
    var bcs = document.querySelectorAll('.best_card')

    bcs.forEach(e => {
        if (
            (e.getBoundingClientRect().left + 5) < b_c.getBoundingClientRect().left &&
            (e.getBoundingClientRect().right) > b_c.getBoundingClientRect().left
        ) {
            var invisivel = e.getBoundingClientRect().right - b_c.getBoundingClientRect().left;
            var visivel = b_c.getBoundingClientRect().left - e.getBoundingClientRect().left;
            var desloar = a == 1 ? invisivel : visivel;
            tamanho_deslocamento = (desloar); /// <===
        }
    });
}
document.querySelector('.b_btn1').addEventListener('click', () => {
    atualiza_posicao()
    variacao_deslocamento(2)
    deslocamento(2)
})

document.querySelector('.b_btn2').addEventListener('click', () => {
    atualiza_posicao()
    variacao_deslocamento(1)
    deslocamento(1)
})

function deslocamento(a) {
    var bc = document.querySelector('.b_carrossel')

    if (ativo) return;

    if (contador == 0) {
        contador += inicio;
    }

    var limiti = a == 1 ? limiti_direita : limiti_esquerda;
    var deslocamento = a == 1 ? -tamanho_deslocamento : +tamanho_deslocamento;
    contador += deslocamento;

    bc.style = `
        transition: 200ms;
        transform: translateX(${contador}px); 
    `
    var cont = a == 1 ? contador : limiti;
    var limi = a == 1 ? limiti : contador;

    if (contador == limiti || cont < limi) {
        ativo = true;

        setTimeout(() => {

            bc.style = `
                transition: none;
                transform: translateX(${inicio}px); 
            `
            contador = inicio;
            ativo = false;
        }, 1000);

    }
}