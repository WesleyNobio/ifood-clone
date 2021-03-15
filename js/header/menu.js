

document.querySelector('.btn-ext').addEventListener('click', ()=>{

    var div_menu = document.createElement('div');
    div_menu.classList = 'div_menu_2';
    div_menu.appendChild(document.querySelector('.menu-2'))

    document.querySelector('body').appendChild(div_menu);
})

document.querySelector('.btn-int').addEventListener('click', ()=>{

    document.querySelector('.h_nav').appendChild(document.querySelector('.menu-2'));
    document.querySelector('.div_menu_2').remove();
})