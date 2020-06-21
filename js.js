//SHOW OR HIDE LATERAL MENU
function ShowHideMenu(){
    const menu=$('.menu')
    const overlay=$('#overlay')
    const sandwich=$('#sandwich')
    if(menu.classList.contains('hideMenu')){
        menu.classList.remove('hideMenu')
        overlay.classList.add('showOverlay')
        sandwich.classList.add('rotate')
    }else{
        menu.classList.add('hideMenu') 
        overlay.classList.remove('showOverlay')
        sandwich.classList.remove('rotate')
    }
}
//SELECTOR 
function $(selector){
    return document.querySelector(selector)
}
//SHOW OR HIDE CARD DETAIL
function hideShowCard(){
    console.log('hideShowCard()')
}
//READ JSON
 function traerDatos(){
    var xhttp=new XMLHttpRequest();
    xhttp.open("GET","historias.json",true);
    xhttp.send();
    
    xhttp.onreadystatechange=function (){
        if(this.readyState==4 && this.status==200){
            let datos=JSON.parse(this.responseText) 
            createCards(datos)
        }
    }
}

//CREATE CARDS
function createCards(itemJson){
    for(let item of itemJson){
        let i=0;
        createOneCard(i,item.title,item.text,item.img,item.link)
        i++;
    }     
}

function createOneCard(i,title,text,img,link){
    const newCard=document.createElement('div');
    const cardTitle=document.createElement('div');
        const cardTitleSpan=document.createElement('span');
            const CardTitleSpanText=document.createTextNode(title)
    const cardText=document.createElement('div');
        const cardTextP=document.createElement('p');
            const CardTextPText=document.createTextNode(text)
    const cardImg=document.createElement('div');
        const cardImgImg=document.createElement('img');

    newCard.setAttribute('class','card');
    newCard.setAttribute('onclick','hideShowCard()');
    let idText='00000' + i;
    idText=idText.substr(idText.length-2)
    newCard.setAttribute('id','card'+idText);
        cardTitle.setAttribute('class','cardTitle')
        cardText.setAttribute('class','cardText')
        cardImg.setAttribute('class','cardImg')
            cardImgImg.setAttribute('src',img) //aca va el link de la imagen

    $('#main').appendChild(newCard);
    newCard.appendChild(cardTitle);
        cardTitle.appendChild(cardTitleSpan);
            cardTitleSpan.appendChild(CardTitleSpanText);
    newCard.appendChild(cardText);
        cardText.appendChild(cardTextP);
        cardTextP.appendChild(CardTextPText);
    newCard.appendChild(cardImg);
        cardImg.appendChild(cardImgImg);
}

traerDatos()
