
var s_div = document.querySelector('.s-carrocel')
var tamanho_tela = document.querySelector('body').clientWidth;
var intervalo, t_scroll, t_direita = true, deslocamento_div_volta, tamanho_scroll;;

// =====================   tela menor que 761px =====================================
var num = 0, leftAnterior = 0, contador = 0, busy_button = false;

function c(i, cl, a) {
    if (a) {
        i[2].insertAdjacentElement("afterend", cl)
    } else {
        i[0].insertAdjacentElement("beforebegin", cl)
    }
    return document.querySelectorAll('.s_img');
}
function d(item, a) {

    var i, num = item[0].offsetLeft;
    i = setInterval(inte, 10);

    function inte() {
        if (a) {
            if ((item[0].offsetLeft) < (-600)) {
                clearInterval(i)
                item[0].remove()
                busy_button = false
            }
            num = num - 10;
            item[0].style.marginLeft = `${num}px`
        }else{
            if ((item[0].offsetLeft) > (leftAnterior - 65)){
                clearInterval(i)
                busy_button = false;
            }
            num = num + 100;
            item[0].style.marginLeft = `${num + 138}px`
        }
    }
}

function foi_voltou(a) {

    if(busy_button) return;
    busy_button = true;

    var item = document.querySelectorAll('.s_img');
    item.forEach(element => {
        element.removeAttribute('style')
    });

    var clone = a ? item[0].cloneNode(true) : item[2].cloneNode(true);
    if (!a) clone.style.marginLeft = `${((item[0].offsetLeft) - 600)}px`

    leftAnterior = item[0].offsetLeft

    item = c(item, clone, a)

    if (!a) item[3].remove()
    d(item, a)
}

// ===================== inicio do processo ========================================

document.querySelector('.s_btn2').addEventListener('click', () => {
    if ((tamanho_tela) < 761) {
        foi_voltou(true)
    } else {
        mover_scroll_direita()
    }
})

document.querySelector('.s_btn1').addEventListener('click', () => {
    if ((tamanho_tela) < 761) {
        foi_voltou(false)
    } else {
        mover_scroll_esquerda()
    }
})

// ===================== inicio do processo ========================================


// =====================   tela maior que 761px =====================================

function start_intervalo() {
    if (t_direita) {
        if ((t_scroll - 2) < (s_div.scrollLeft)) clearInterval(intervalo);
        s_div.scrollLeft += 10;
    }
    if (!t_direita) {
        if (t_scroll > (s_div.scrollLeft)) clearInterval(intervalo);
        s_div.scrollLeft -= 10;
    }

}

function mover_scroll_direita() {
    var item = document.querySelectorAll('.s_img');
    
    deslocamento_div_volta = tamanho_scroll - s_div.scrollLeft;
    t_direita = true;
    
    tamanho_scroll = s_div.scrollWidth - s_div.clientWidth;
    deslocamento_div = (item[1].clientWidth - 10);
    
    var tamanho_s = s_div.scrollLeft == 0 ? deslocamento_div : tamanho_scroll;
    
    t_scroll = tamanho_tela < 800 ? (tamanho_s - 10) : (tamanho_scroll + 1)

    tempo_intervalo = tamanho_tela < 800 ? 1 : 10;
    intervalo = setInterval(start_intervalo, tempo_intervalo)
}

function mover_scroll_esquerda() {
    t_direita = false;
    var tamanho_s = s_div.scrollLeft > (tamanho_scroll - 10) ? (tamanho_scroll - deslocamento_div_volta) : 0;
    t_scroll = tamanho_tela < 800 ? (tamanho_s + 10) : (0 + 1);

    tempo_intervalo = tamanho_tela < 800 ? 1 : 10;
    intervalo = setInterval(start_intervalo, tempo_intervalo)
}

function verifica_scroll(){
    tamanho_scroll = s_div.scrollWidth - s_div.clientWidth;
    tamanho_tela = document.querySelector('body').clientWidth;

    if (tamanho_scroll == s_div.scrollLeft) {
        document.querySelector('.s_btn2').style.display = 'none';
        document.querySelector('.s_btn1').style.display = 'initial';
    } else if (0 == s_div.scrollLeft && tamanho_tela > 760) {
        document.querySelector('.s_btn1').style.display = 'none' // <==;
        document.querySelector('.s_btn2').style.display = 'initial';
    } else if (0 == s_div.scrollLeft && tamanho_tela < 760){
        document.querySelector('.s_btn1').style.display = 'initial';
        document.querySelector('.s_btn2').style.display = 'initial';
    } else {
        document.querySelector('.s_btn1').style.display = 'initial';
        document.querySelector('.s_btn2').style.display = 'initial';
    }
}
function verifica_screen(){
    tamanho_scroll = s_div.scrollWidth - s_div.clientWidth;
    tamanho_tela = document.querySelector('body').clientWidth;
    var imgs = document.querySelectorAll('.s_img');

    if (tamanho_tela > 1200) {
        document.querySelector('.s_btn1').style.display = 'none';
        document.querySelector('.s_btn2').style.display = 'none';
    } else if (tamanho_tela < 760) {
        document.querySelector('.s_btn1').style.display = 'initial';
        document.querySelector('.s_btn2').style.display = 'initial';
    } else {
        document.querySelector('.s_btn1').style.display = 'none';
        document.querySelector('.s_btn2').style.display = 'initial';
        imgs.forEach(element => {
            element.removeAttribute('style')
        });
    }

    if ( s_div.scrollLeft > 0) {
        t_direita = false;
        t_scroll = 1;
        intervalo = setInterval(start_intervalo, 1)
    }
}

document.querySelector('.s-carrocel').addEventListener('scroll', () => {
    verifica_scroll()
})
window.addEventListener('load', ()=>{
    verifica_scroll()
    verifica_screen()
})
window.addEventListener('resize', () => {
    verifica_screen()
})
