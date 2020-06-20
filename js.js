

function ShowHideMenu(){
    
    const menu=document.querySelector('.menu')
    const overlay=document.querySelector('#overlay')
    if(menu.classList.contains('hideMenu')){
        menu.classList.remove('hideMenu')
        overlay.classList.add('showOverlay')
    }else{
        menu.classList.add('hideMenu') 
        overlay.classList.remove('showOverlay')
    }
}