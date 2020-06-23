var datos
//READ JSON
function traerDatos(){
    var xhttp=new XMLHttpRequest();
    xhttp.open("GET","historias.json",true);
    xhttp.send();
    
    xhttp.onreadystatechange=function (){
        if(this.readyState==4 && this.status==200){
            datos=JSON.parse(this.responseText) 
            createCards(datos)
        }
    }
}
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
function hideShowCard(id){
    const cardDetail=$('#cardDetail');
    const cardDetailTitle=$('#cardDetailTitle')
    const cardDetailText=$('#cardDetailText')
    const cardDetailTextAdd=$('#cardDetailTextAdd')
    const cardDetailImg=$('#cardDetailImg')

    if(cardDetail.classList.contains('hide')){
        const cardImg=datos[parseInt(id.substring(id.length-3,id.length))].img
        const cardTitle=datos[parseInt(id.substring(id.length-3,id.length))].title
        const cardText=datos[parseInt(id.substring(id.length-3,id.length))].text
        const cardTextAdd=datos[parseInt(id.substring(id.length-3,id.length))].textAdd
        const cardLink=datos[parseInt(id.substring(id.length-3,id.length))].link

        cardDetailImg.src=cardImg
        cardDetailTitle.innerHTML=cardTitle
        cardDetailText.innerHTML=cardText
        cardDetailTextAdd.innerHTML=cardTextAdd
        cardDetail.classList.remove('hide')
    }else{
        cardDetail.classList.add('hide')
    }
}
//SHOW ABOUT WITH DETAIL CARD
function showAbout(){
    const cardDetail=$('#cardDetail');
    const cardDetailTitle=$('#cardDetailTitle')
    const cardDetailText=$('#cardDetailText')
    const cardDetailTextAdd=$('#cardDetailTextAdd')
    const cardDetailImg=$('#cardDetailImg')

    cardDetailImg.src='https://i.imgur.com/iAsv8NK.jpg'
    cardDetailTitle.innerHTML='SOBRE NOSOTROS'
    cardDetailText.innerHTML='Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus itaque enim quasi voluptatum nihil. Nostrum voluptatum corrupti reiciendis repellat quibusdam ex amet aliquid, ratione natus praesentium.'
    cardDetailTextAdd.innerHTML='Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus itaque enim quasi voluptatum nihil. Nostrum voluptatum corrupti reiciendis repellat quibusdam ex amet aliquid, ratione natus praesentium.'
    cardDetail.classList.remove('hide')   
}

//CREATE CARDS
function createCards(itemJson){
    var i=0;
    for(let item of itemJson){
        createOneCard(i,item.title,item.text,item.img,item.link)
        i++;
    }     
}

function createOneCard(i,title,text,img,link){
    //Declarations and initializations
    const newCard=document.createElement('div');
    const cardTitle=document.createElement('div');
        const cardTitleSpan=document.createElement('span');
            const CardTitleSpanText=document.createTextNode(title)
    const cardText=document.createElement('div');
        const cardTextP=document.createElement('p');
            const CardTextPText=document.createTextNode(text)
    const cardImg=document.createElement('div');
        const cardImgImg=document.createElement('img');

    let id='000'+i
    id='card'+ id.substring(id.length-3,id.length)
    //set attributes to elements
    newCard.setAttribute('class','card');
    newCard.setAttribute('onclick','hideShowCard(this.id)');
    newCard.setAttribute('id',id);
        cardTitle.setAttribute('class','cardTitle')
        cardText.setAttribute('class','cardText')
        cardImg.setAttribute('class','cardImg')
            cardImgImg.setAttribute('src',img) 

    //set childs
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
//SCROLL TO TOP ON MAIN
function ScrollToTop(){
    $('#main').scrollTop=0
}
//MOSTRAR DETALLES DE REDES SOCIALES
function ShowMenuSocialDetail(cont){
    $('#menuSocialDetail').innerHTML=cont.dataset.text
}
//USAGE
traerDatos()
$('body').scrollTop=1000
